import {DataSchema} from "../schema/data-schema.class";
/**
 * Created by Christophe on 17/10/2017.
 */

export class Structure {

    protected _stack:Function[] = [];

    constructor(
        func:Function,
        protected _defaultValue:any
    ) {
        this._stack.push(func);
    }

    nonNull():Structure {

        this._stack.push((value:any) => {
            return value !== null;
        });

        return this;
    }

    custom(func:Function):Structure {

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

    get defaultValue():any {
        if (this._defaultValue instanceof DataSchema) {
            return (this._defaultValue as DataSchema).generateModel();
        } if (typeof this._defaultValue === "function") {
            return this._defaultValue();
        } else {
            return this._defaultValue;
        }
    }

}