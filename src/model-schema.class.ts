/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchemaAttributes} from "./model-schema-attributes.interface";

export class ModelSchema {

    constructor(
        public version:number,
        public attributes:ModelSchemaAttributes = {}
    ) {}

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
}