/**
 * Created by Christophe on 23/10/2017.
 */
import {ModelSchema} from "./model-schema.class";

export class ExtendedModelSchema {

    constructor(
        private _schema:ModelSchema,
        private _version:number
    ) {}

    generateModel():{[key:string]:any} {
        return this._schema.generateModel(this._version);
    }

    validateModel(attributes:{[key:string]:any}):boolean {
        return this._schema.validateModel(attributes);
    }
}