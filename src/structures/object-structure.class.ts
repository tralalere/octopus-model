/**
 * Created by Christophe on 18/10/2017.
 */
import {Structure} from "./structure.class";
import {DataSchema} from "../schema/data-schema.class";

export class ObjectStructure extends Structure {

    constructor(
        func:Function,
        defaultValue:Object
    ) {
        super(func, defaultValue);
    }

    schema(schema:DataSchema, version:number = null):ObjectStructure {

        this._stack.push((val:{[key:string]:any}) => {
            return schema.validateModel(val, version);
        });

        return this;
    }

    keySchema(key:string, schema:DataSchema, version:number = null):ObjectStructure {

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