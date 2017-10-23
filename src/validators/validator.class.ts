/**
 * Created by Christophe on 17/10/2017.
 */

export class Validator {

    protected _stack:Function[] = [];

    constructor(func:Function) {
        this._stack.push(func);
    }

    nonNull():Validator {

        this._stack.push((value:any) => {
            return value !== null;
        });

        return this;
    }

    custom(func:Function):Validator {

        this._stack.push((value:any) => {
            return func(value);
        });

        return this;
    }

    getStackValidity(value:any):boolean {

        for (let func of this._stack) {
            if (!func(value)) {
                return false;
            }
        }

        return true;
    }

}