/**
 * Created by Christophe on 18/10/2017.
 */
import {Structure} from "./structure.class";
import {DataSchema} from "../schema/data-schema.class";

export class ArrayStructure extends Structure {
    
    constructor(
        func:Function,
        defaultValue:any[]|DataSchema,
        public arrayLength:number = 1
    ) {
        super(func, defaultValue);
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

    schema(schema:DataSchema, version:number = null):ArrayStructure {

        this._stack.push((val:{[key:string]:any}[]) => {

            for (let elem of val) {
                if (!schema.validateModel(elem, version)) {
                    return false;
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