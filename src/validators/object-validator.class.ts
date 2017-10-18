/**
 * Created by Christophe on 18/10/2017.
 */
import {Validator} from "./validator.class";

export class ObjectValidator extends Validator {

    constructor(
        func:Function
    ) {
        super(func);
    }
}