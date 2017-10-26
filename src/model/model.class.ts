/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchema} from "../schema/model-schema.class";

export class Model {

    version:number;
    attributes:{[key:string]:any} = {};

    constructor(
        data:Object,
        private _schema:ModelSchema
    ) {

        // pas ici
        if (Object.keys(data).length === 2 && data["version"] !== undefined && data["attributes"] !== undefined) {
            // formatted object
            this.attributes = data["attributes"];
            this.version = data["version"];
        } else {
            // raw object
            this.attributes = data;
        }
    }

    fromStore(data:Object) {
        if (Object.keys(data).length === 2 && data["version"] !== undefined && data["attributes"] !== undefined) {
            // formatted object
            this.attributes = data["attributes"];
            this.version = data["version"];
        } else {
            // raw object
            this.attributes = data;
        }
    }

    fromFront(data:Object) {

    }

    get validated():boolean {
        return this._schema.validateModel(this.attributes, this.version);
    }

    toJSON():string {
        return JSON.stringify(this.attributes);
    }
}