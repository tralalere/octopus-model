/**
 * Created by Christophe on 17/10/2017.
 */

export class Validator {

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