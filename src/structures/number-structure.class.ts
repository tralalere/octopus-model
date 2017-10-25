/**
 * Created by Christophe on 18/10/2017.
 */
import {Structure} from "./structure.class";

export class NumberStructure extends Structure {
    
    constructor(
        func:Function,
        defaultValue:number
    ) {
        super(func, defaultValue);
    }

    min(minValue:number):NumberStructure {

        this._stack.push((val:number) => {
            return val >= minValue;
        });

        return this;
    }

    max(maxValue:number):NumberStructure {

        this._stack.push((val:number) => {
            return val <= maxValue;
        });

        return this;
    }

    positive():NumberStructure {

        this._stack.push((val:number) => {
            return val >= 0;
        });
        
        return this;
    }
}