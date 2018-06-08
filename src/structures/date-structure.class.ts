import {Structure} from "./structure.class";

export class DateStructure extends Structure {

    constructor(
        func: Function,
        defaultValue: number
    ) {
        super(func, defaultValue);
    }

    now() {
        this._defaultValue = () => {
            return Date.now();
        };

        this._stack.push(() => {
            return true;
        });

        return this;
    }
}