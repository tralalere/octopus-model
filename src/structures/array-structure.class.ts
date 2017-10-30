/**
 * Created by Christophe on 18/10/2017.
 */
import {Structure} from "./structure.class";
import {DataSchema} from "../schema/data-schema.class";

export class ArrayStructure extends Structure {
    
    constructor(
        func:Function,
        defaultValue:any[]|DataSchema|Structure,
        private _arrayLength:number = 1
    ) {
        super(func, defaultValue);
    }

    get defaultValue():any {
        if (this._defaultValue instanceof DataSchema) {
            let arr:any[] = [];

            for (let i:number = 0; i < this._arrayLength; i++) {
                arr.push((this._defaultValue as DataSchema).generateModel());
            }

            return arr;
        } else if (this._defaultValue instanceof Structure) {
            let arr:any[] = [];

            for (let i:number = 0; i < this._arrayLength; i++) {
                arr.push((this._defaultValue as Structure).defaultValue);
            }

            return arr;
        }
        else {
            return this._defaultValue;
        }
    }

    length(length:number):ArrayStructure {

        this._stack.push((val:any[]) => {
            return val.length === length;
        });

        return this;
    }

    minLength(min:number):ArrayStructure {

        this._stack.push((val:any[]) => {
            return val.length >= min;
        });

        return this;
    }

    maxLength(max:number):ArrayStructure {

        this._stack.push((val:any[]) => {
            return val.length <= max;
        });

        return this;
    }

    string():ArrayStructure {
        return this._isTypeOf("string");
    }

    number():ArrayStructure {
        return this._isTypeOf("number");
    }

    schema(schema:DataSchema|Structure, version:number = null):ArrayStructure {

        this._stack.push((val:{[key:string]:any}[]) => {

            for (let elem of val) {

                if (schema instanceof DataSchema) {
                    if (!(schema as DataSchema).validateModel(elem, version)) {
                        return false;
                    }
                } else if (schema instanceof Structure) {
                    if (!(schema as Structure).getStackValidity(elem)) {
                        return false;
                    }
                }
            }

            return true;
        });

        return this;
    }

    private _isTypeOf(type:string):ArrayStructure {

        this._stack.push((val:any[]) => {

            for (let elem of val) {
                if ((typeof elem) !== type) {
                    return false;
                }
            }

            return true;
        });

        return this;
    }
}