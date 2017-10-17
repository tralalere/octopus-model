/**
 * Created by Christophe on 17/10/2017.
 */

export class BaseValidator {

    protected _stack:Function[] = [];

    constructor(func:Function) {
        this._stack.push(func);
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