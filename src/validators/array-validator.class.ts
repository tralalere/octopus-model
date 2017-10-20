/**
 * Created by Christophe on 18/10/2017.
 */
import {Validator} from "./validator.class";
import {ModelSchema} from "../model-schema.class";

export class ArrayValidator extends Validator {
    
    constructor(
        func:Function
    ) {
        super(func);
    }

    length(length:number):ArrayValidator {

        this._stack.push((val:any[]) => {
            return val.length === length;
        });

        return this;
    }

    minLength(min:number):ArrayValidator {

        this._stack.push((val:any[]) => {
            return val.length >= min;
        });

        return this;
    }

    maxLength(max:number):ArrayValidator {

        this._stack.push((val:any[]) => {
            return val.length <= max;
        });

        return this;
    }

    string():ArrayValidator {
        return this._isTypeOf("string");
    }

    number():ArrayValidator {
        return this._isTypeOf("number");
    }

    schema(schema:ModelSchema, version:number = null):ArrayValidator {

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

    private _isTypeOf(type:string):ArrayValidator {

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