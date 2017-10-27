/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchemaAttributes} from "../interfaces/model-schema-attributes.interface";
import {ModelSchemaExtension} from "../interfaces/model-schema-extension.interface";
import {Generator} from "../generators/generator.class";
import {ExtendedModelSchema} from "./extended-model-schema.class";
import {DataSchema} from "./data-schema.class";
import {Structure} from "../structures/structure.class";
import {VersionedAttributes} from "../interfaces/versioned-attributes.interface";

export class ModelSchema extends DataSchema {

    private _versionNumbers:number[] = [];
    private _attributes:{[key:number]:ModelSchemaAttributes} = {};
    private _deletions:{[key:number]:string[]} = {};
    private _extensions:{[key:number]:ExtendedModelSchema} = {};

    constructor(
        public attributes:ModelSchemaAttributes = {}
    ) {
        super();
        
        this._attributes[this.version] = attributes;
        this._versionNumbers.push(this.version);
    }

    get edgeVersion():number {
        return this._versionNumbers[this._versionNumbers.length - 1];
    }

    private _getExclusiveFields(version:number = null):{[key:number]:ModelSchemaAttributes} {

        if (version === null) {
            version = this.edgeVersion;
        }

        let attributes:{[key:number]:ModelSchemaAttributes} = {};

        let versionIndex:number = this._versionNumbers.indexOf(version);

        if (versionIndex === -1) {
            return null;
        }

        let versions:number[] = this._versionNumbers.slice(0, versionIndex + 1);

        for (let v of versions) {

            if (this._deletions[v]) {
                // suppressions
                for (let deletedKey of this._deletions[v]) {

                    for (let vid in attributes) {
                        if (attributes.hasOwnProperty(vid) && attributes[vid][deletedKey] !== undefined) {
                            delete attributes[vid][deletedKey];
                        }
                    }

                }
            }

            let fields:ModelSchemaAttributes = this._copyObject(this._attributes[v]);
            attributes[v] = fields;
        }

        return attributes;
    }

    private _copyObject(object:{[key:string]:any}):{[key:string]:any} {

        let copy:{[key:string]:any} = {};

        for (let key of Object.keys(object)) {
            copy[key] = object[key];
        }

        return copy;
    }

    private _getExclusiveFieldsAtVersion(version:number):ModelSchemaAttributes {

        let attributes:ModelSchemaAttributes = {};

        let versionIndex:number = this._versionNumbers.indexOf(version);

        if (versionIndex === -1) {
            return null;
        }

        for (let key in this._attributes[version]) {
            if (this._attributes[version].hasOwnProperty(key)) {
                attributes[key] = this._attributes[version][key];
            }
        }

        return attributes;
    }

    private _getFieldsAtVersion(version:number):ModelSchemaAttributes {

        let versionIndex:number = this._versionNumbers.indexOf(version);

        if (versionIndex === -1) {
            return null;
        }

        let versions:number[] = this._versionNumbers.slice(0, versionIndex + 1);
        let attributes:ModelSchemaAttributes = {};

        for (let i:number = 0; i < versions.length; i++) {

            let versionNumber:number = versions[i];
            let attributesInVersion:ModelSchemaAttributes = this._attributes[versionNumber];

            //console.log("att in", attributesInVersion, this._attributes);

            if (this._deletions[versionNumber]) {

                for (let key of this._deletions[versionNumber]) {
                    if (attributes[key]) {
                        delete attributes[key];
                    }
                }
            }

            for (let key in attributesInVersion) {
                if (attributesInVersion.hasOwnProperty(key)) {
                    attributes[key] = attributesInVersion[key];
                }
            }
        }

        //console.log("vers", version, versions, attributes);

        //console.log(version, versions, attributes);
        return attributes;
    }

    private _getFieldDefaultValue(field:Structure):any {
        return field.defaultValue;
    }

    filterModel(attributes:{[key:string]:any}, version:number = null):{[key:number]:any} {

        let updated:{[key:number]:any} = {};

        if (!version) {
            version = this.edgeVersion;
        }

        //console.log("filter", attributes, version);

        let fields:ModelSchemaAttributes = this._getFieldsAtVersion(version);

        for (let key in fields) {
            if (fields.hasOwnProperty(key)) {

                if (attributes[key] === undefined) {
                    // 1- le champ n'existe pas dans les attributes. Création de sa valeur par défaut
                    updated[key] = this._getFieldDefaultValue(fields[key]);
                } else if (!fields[key].getStackValidity(attributes[key])) {
                    // 2- le champ existe, mais avec une valeur incorrecte. Remplacement par sa valeur par défaut
                    updated[key] = this._getFieldDefaultValue(fields[key]);
                } else {
                    // 3- Utilisation de la valeur actuelle
                    updated[key] = attributes[key];
                }
            }
        }

        return updated;
    }
    
    validateModel(attributes:{[key:string]:any}, version:number = null):boolean {

        if (version === null) {
            version = this.edgeVersion;
        }

        let completeAttributes:ModelSchemaAttributes = this._getFieldsAtVersion(version);

        //console.log("ca", version, completeAttributes);

        for (let key in attributes) {

            if (attributes.hasOwnProperty(key)) {

                if (!completeAttributes[key]) {
                    return false;
                }
            }
        }

        for (let key in completeAttributes) {

            if (completeAttributes.hasOwnProperty(key)) {

                // TODO: verifier si on peut tester d'une meilleure manière la non-définition de la valeur
                if (attributes[key] === undefined) {
                    return false;
                }

                if (attributes[key] && !completeAttributes[key].getStackValidity(attributes[key])) {
                    return false;
                }
            }
        }

        return true;
    }

    blindValidate(attributes:{[key:string]:any}):boolean {

        for (let version of this._versionNumbers) {

            var updated:{[key:string]:any} = this.filterModel(attributes, version);

            if (this.validateModel(attributes, version)) {
                console.log("Validated at", version, attributes);
                return true;
            }
        }

        return false;
    }

    generateModel(version:number = null, defaults:{[key:string]:any} = null):{[key:string]:any} {

        let generatedModel:{[key:string]:any} = {};

        if (version === null) {
            version = this.edgeVersion;
        }

        let completeAttributes:ModelSchemaAttributes = this._getFieldsAtVersion(version);

        // vérification des defaults
        if (defaults) {
            for (let key of Object.keys(defaults)) {
                if (completeAttributes[key] === undefined) {
                    console.log("Generate model: incorrect field in default - " + key);
                }
            }
        }

        for (let key in completeAttributes) {
            if (completeAttributes.hasOwnProperty(key)) {
                if (defaults && defaults[key] !== undefined) {

                    if (!completeAttributes[key].getStackValidity(defaults[key])) {
                        console.log("Generate model: default value do not match the schema - " + key);
                        generatedModel[key] = completeAttributes[key].defaultValue;
                    } else {
                        generatedModel[key] = defaults[key];
                    }

                } else {
                    generatedModel[key] = completeAttributes[key].defaultValue;
                }
            }
        }

        return generatedModel;
    }

    addVersion(versionNumber:number, attributes:ModelSchemaExtension):ExtendedModelSchema {

        if (this._versionNumbers.indexOf(versionNumber) !== -1) {
            console.log("Model version overriding attempt. Addition is ignored.");
            return;
        }

        this._versionNumbers.push(versionNumber);

        if (attributes.additions) {
            this._attributes[versionNumber] = attributes.additions;
        }

        if (attributes.deletions) {
            this._deletions[versionNumber] = attributes.deletions;
        }

        let extension:ExtendedModelSchema = new ExtendedModelSchema(this, versionNumber);
        this._extensions[versionNumber] = extension;
        return extension;
    }

    private _getVersionPrefix(version:number):string {
        return "v" + version + "_";
    }

    getFromVersionedAttributes(versioned:VersionedAttributes, targetVersion:number = null, usePrefix:boolean = true):{[key:string]:any} {

        if (targetVersion === null) {
            targetVersion = this.edgeVersion;
        }

        let fields:{[key:number]:ModelSchemaAttributes} = this._getExclusiveFields(targetVersion);
        let retAttributes:{[key:string]:any} = {};
        let vAttributes:{[key:string]:any} = versioned;

        for (let vnum in fields) {
            if (fields.hasOwnProperty(vnum)) {
                let versionFields:ModelSchemaAttributes = fields[vnum];

                for (let key in vAttributes) {
                    if (vAttributes.hasOwnProperty(key)) {
                        if (vAttributes[key] !== undefined) {

                            let newKey:string;

                            if (usePrefix && key.indexOf("v" + vnum + "_") === 0) {
                                newKey = key.replace("v" + vnum + "_", "");
                            } else {
                                newKey = key;
                            }

                            if (versionFields[newKey] !== undefined) {
                                retAttributes[newKey] = vAttributes[key];
                            }
                        }
                    }
                }
            }
        }

        return retAttributes;
    }
    
    getVersionedAttributes(attributes:{[key:string]:any}, version:number = null, usePrefix:boolean = true):VersionedAttributes {

        if (version === null) {
            version = this.edgeVersion;
        }

        let retAttributes:{[key:string]:any} = {};
        let versionIndex:number = this._versionNumbers.indexOf(version);

        let subVersions:number[] = this._versionNumbers.slice(0, versionIndex + 1);

        for (let vnum of subVersions) {
            let exclusives:ModelSchemaAttributes = this._getExclusiveFieldsAtVersion(vnum);

            for (let key in exclusives) {

                if (exclusives.hasOwnProperty(key)) {

                    if (attributes[key] !== undefined) {
                        let newKey:string = usePrefix ? this._getVersionPrefix(vnum) + key : key;
                        retAttributes[newKey] = attributes[key];
                    }
                }
            }
        }

        return retAttributes;
    }
}