/**
 * Created by Christophe on 23/10/2017.
 */

export class Generator {

    constructor(
        private _generatorFunction:Function
    ) {}

    get():any {
        return this._generatorFunction();
    }
}