/**
 * Created by Christophe on 18/10/2017.
 */
import {Validator} from "./validator.class";
import {DataSchema} from "../schema/data-schema.class";

export class ObjectValidator extends Validator {

    constructor(
        func:Function
    ) {
        super(func);
    }

    schema(schema:DataSchema, version:number = null):ObjectValidator {

        this._stack.push((val:{[key:string]:any}) => {
            return schema.validateModel(val, version);
        });

        return this;
    }

    keySchema(key:string, schema:DataSchema, version:number = null):ObjectValidator {

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