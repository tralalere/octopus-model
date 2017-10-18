/**
 * Created by Christophe on 17/10/2017.
 */
import {Validator} from "./validator.class";

export class StringValidator extends Validator {
    
    constructor(
        func:Function
    ) {
        super(func);
    }

    match(regExp:RegExp):StringValidator {

        this._stack.push((val:string) => {
            return val.match(regExp);
        });

        return this;
    }

    contains(value:string):StringValidator {

        this._stack.push((val:string) => {
            return val.indexOf(value) !== -1;
        });

        return this;
    }
    
    maxLength(value:number):StringValidator {

        this._stack.push((val:string) => {
            return val.length <= value;
        });

        return this;
    }
}