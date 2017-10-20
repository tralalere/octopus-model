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

    schema(schema:ModelSchema, version:number = null):ObjectValidator {

        this._stack.push((val:{[key:string]:any}) => {
            return schema.validateModel(val, version);
        });

        return this;
    }

    keySchema(key:string, schema:ModelSchema, version:number = null):ObjectValidator {

        this._stack.push((val:{[key:string]:any}) => {

            // TODO: undefined à voir
            if (val[key] === undefined) {
                return false;
            }

            return schema.validateModel(val[key], version);
        });

        return this;
    }
}