/**
 * Created by Christophe on 18/10/2017.
 */
import {Validator} from "./validator.class";

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
}