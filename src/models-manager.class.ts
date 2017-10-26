/**
 * Created by Christophe on 24/10/2017.
 */
import {ModelSchemaAttributes} from "./interfaces/model-schema-attributes.interface";
import {ModelSchemaExtension} from "./interfaces/model-schema-extension.interface";
import {ModelSchema} from "./schema/model-schema.class";
import {VersionedAttributes} from "./interfaces/versioned-attributes.interface";

export class ModelsManager {

    private _schemas:{[key:string]:ModelSchema} = {};

    constructor(
        private _usePrefix:boolean = true
    ) {}

    addSchema(type:string, attributes:ModelSchemaAttributes) {

        if (this._schemas[type]) {
            console.log("Models manager: attempt to override a schema width this type id: " + type + ". Addition ignored.");
            return;
        }

        this._schemas[type] = new ModelSchema(attributes);
    }

    extendsSchema(type:string, extension:ModelSchemaExtension):number {

        if (!this._schemas[type]) {
            console.log("Models manager: attempt to extends a schema which does not exists : " + type + ". Extension ignored.");
            return;
        }

        let schema:ModelSchema = this._schemas[type];
        let version:number = schema.edgeVersion + 1;

        schema.addVersion(version, extension);
        return version;
    }

    private _getSchema(type:string):ModelSchema {

        if (!this._schemas[type]) {
            console.log("Models manager: trying to query a schema with unknown type id: " + type + ".");
            return null;
        }

        return this._schemas[type];
    }

    getDefaults(type:string, version:number = null):{[key:string]:any} {

        let schema:ModelSchema = this._getSchema(type);

        if (!schema) {
            console.log("Get defaults failed: " + type);
            return null;
        }

        return schema.generateModel(version);
    }

    validate(type:string, object:{[key:string]:any}, version:number = null):boolean {

        let schema:ModelSchema = this._getSchema(type);

        if (!schema) {
            return false;
        }

        return schema.validateModel(object, version);
    }

    update(type:string, object:{[key:string]:any}, version:number = null):{[key:string]:any} {

        let schema:ModelSchema = this._getSchema(type);

        if (!schema) {
            return {};
        }

        return schema.updateModel(object, version);
    }

    toStoreData(type:string, object:{[key:string]:any}, version:number = null):VersionedAttributes {

        let schema:ModelSchema = this._getSchema(type);

        if (!schema) {
            return null;
        }

        return schema.getVersionedAttributes(object, version);
    }

    toClientData(type:string, object:{[key:string]:any}, version:number = null):{[key:string]:any} {

        let schema:ModelSchema = this._getSchema(type);

        if (!schema) {
            return null;
        }

        return schema.getFromVersionedAttributes(object, version);
    }

    static mergeVersions(storeVersion:VersionedAttributes, clientVersion:VersionedAttributes):VersionedAttributes {

        let attributes:VersionedAttributes = {};

        for (let key in storeVersion) {
            if (storeVersion.hasOwnProperty(key)) {
                attributes[key] = storeVersion[key];
            }
        }

        for (let key in clientVersion) {
            if (clientVersion.hasOwnProperty(key)) {
                attributes[key] = clientVersion[key];
            }
        }

        return attributes;
    }
}