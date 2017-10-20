/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchemaAttributes} from "./interfaces/model-schema-attributes.interface";
import {ModelSchemaExtension} from "./interfaces/model-schema-extension.interface";

export class ModelSchema {

    private _versionNumbers:number[] = [];
    private _attributes:{[key:number]:ModelSchemaAttributes} = {};
    private _deletions:{[key:number]:string[]} = {};

    constructor(
        public attributes:ModelSchemaAttributes = {},
        public version:number = 0
    ) {
        this._attributes[version] = attributes;
        this._versionNumbers.push(version);
    }

    /*validateModel(attributes:{[key:string]:any}):boolean {

        for (let key in attributes) {

            if (attributes.hasOwnProperty(key)) {

                if (!this.attributes[key]) {
                    return false;
                }
            }
        }
        
        for (let key in this.attributes) {
            
            if (this.attributes.hasOwnProperty(key)) {

                if (!attributes[key] && this.attributes[key].required !== false) {
                    return false;
                }

                if (attributes[key] && !this.attributes[key].validator.getStackValidity(attributes[key])) {
                    return false;
                }
            }
        }

        return true;
    }*/

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

        return attributes;
    }
    
    validateModel(attributes:{[key:string]:any}, version:number = null):boolean {

        if (version === null) {
            version = this._versionNumbers[this._versionNumbers.length - 1];
        }

        let completeAttributes:ModelSchemaAttributes = this._getFieldsAtVersion(version);

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
                if (attributes[key] === undefined && completeAttributes[key].required !== false) {
                    return false;
                }

                if (attributes[key] && !completeAttributes[key].validator.getStackValidity(attributes[key])) {
                    return false;
                }
            }
        }

        return true;
    }

    generateModel(version:number = null):{[key:string]:any} {

        let generatedModel:{[key:string]:any} = {};

        if (version === null) {
            version = this._versionNumbers[this._versionNumbers.length - 1];
        }

        let completeAttributes:ModelSchemaAttributes = this._getFieldsAtVersion(version);

        for (let key in completeAttributes) {
            if (completeAttributes.hasOwnProperty(key)) {
                generatedModel[key] = completeAttributes[key].defaultValue;
            }
        }

        return generatedModel;
    }

    addVersion(versionNumber:number, attributes:ModelSchemaExtension) {

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
    }
}