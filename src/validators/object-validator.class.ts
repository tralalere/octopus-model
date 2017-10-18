/**
 * Created by Christophe on 18/10/2017.
 */
import {Validator} from "./validator.class";
import {ModelSchema} from "../model-schema.class";

export class ObjectValidator extends Validator {

    constructor(
        func:Function
    ) {
        super(func);
    }

    schema(schema:ModelSchema):ObjectValidator {

        this._stack.push((val:{[key:string]:any}) => {
            return schema.validateModel(val);
        });

        return this;
    }

    keySchema(key:string, schema:ModelSchema):ObjectValidator {

        this._stack.push((val:{[key:string]:any}) => {

            if (!val[key]) {
                return false;
            }

            return schema.validateModel(val[key]);
        });

        return this;
    }
}