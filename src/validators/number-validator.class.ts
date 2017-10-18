/**
 * Created by Christophe on 18/10/2017.
 */
import {Validator} from "./validator.class";

export class NumberValidator extends Validator {
    
    constructor(
        func:Function
    ) {
        super(func);
    }

    min(minValue:number):NumberValidator {

        this._stack.push((val:number) => {
            return val >= minValue;
        });

        return this;
    }

    max(maxValue:number):NumberValidator {

        this._stack.push((val:number) => {
            return val <= maxValue;
        });

        return this;
    }

    positive():NumberValidator {

        this._stack.push((val:number) => {
            return val >= 0;
        });
        
        return this;
    }
}