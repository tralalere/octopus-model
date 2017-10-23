/**
 * Created by Christophe on 23/10/2017.
 */
import {ModelSchema} from "./model-schema.class";
import {DataSchema} from "./data-schema.class";

export class ExtendedModelSchema extends DataSchema {

    constructor(
        private _schema:ModelSchema,
        private _version:number
    ) {
        super();
    }

    generateModel():{[key:string]:any} {
        return this._schema.generateModel(this._version);
    }

    validateModel(attributes:{[key:string]:any}):boolean {
        return this._schema.validateModel(attributes);
    }
}