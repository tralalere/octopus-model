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
    }

    validateModel(attributes:{[key:string]:any}):boolean {

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
    }

    private _getFieldsAtVersion(version:number):ModelSchemaAttributes {

        let versionIndex:number = this._versionNumbers.indexOf(version);

        if (versionIndex === -1) {
            return null;
        }

        let versions:number[] = this._versionNumbers.slice(0, versionIndex);
        let attributes:ModelSchemaAttributes = {};

        for (let i:number = 0; i < versions.length; i++) {

            let versionNumber:number = versions[i];
            let attributesInVersion:ModelSchemaAttributes = this._attributes[versionNumber];

            for (let key in attributesInVersion) {

                if (attributesInVersion.hasOwnProperty(key)) {
                    attributes[key] = attributesInVersion[key];
                }
            }
        }

        return attributes;
    }
    
    validateModelAtVersion(version:number, attributes:{[key:string]:any}):boolean {
        return false;
    }

    generateModelAtVersion(version:number):{[key:string]:any} {
        return {};
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
    }
}