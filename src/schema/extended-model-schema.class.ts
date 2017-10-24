/**
 * Created by Christophe on 23/10/2017.
 */
import {ModelSchema} from "./model-schema.class";
import {DataSchema} from "./data-schema.class";

export class ExtendedModelSchema extends DataSchema {

    constructor(
        private _schema:ModelSchema,
        version:number
    ) {
        super();
        this.version = version
    }

    generateModel():{[key:string]:any} {
        return this._schema.generateModel(this.version);
    }

    validateModel(attributes:{[key:string]:any}):boolean {
        return this._schema.validateModel(attributes);
    }
}