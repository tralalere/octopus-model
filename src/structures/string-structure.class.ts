/**
 * Created by Christophe on 17/10/2017.
 */
import {Structure} from "./structure.class";

export class StringStructure extends Structure {
    
    constructor(
        func:Function,
        defaultValue:string
    ) {
        super(func, defaultValue);
    }

    match(regExp:RegExp):StringStructure {

        this._stack.push((val:string) => {
            return val.match(regExp);
        });

        return this;
    }

    contains(value:string):StringStructure {

        this._stack.push((val:string) => {
            return val.indexOf(value) !== -1;
        });

        return this;
    }
    
    maxLength(value:number):StringStructure {

        this._stack.push((val:string) => {
            return val.length <= value;
        });

        return this;
    }

    minLength(value:number):StringStructure {

        this._stack.push((val:string) => {
            return val.length >= value;
        });

        return this;
    }
}