/**
 * Created by Christophe on 17/10/2017.
 */
import {Validator} from "./validators/validator.class";

export class ModelSchema {

    constructor(
        public version:number,
        public attributes:{[key:string]:Validator} = {}
    ) {}

    validateModel(attributes:{[key:string]:any}):boolean {
        
        for (let key in attributes) {
            
            if (attributes.hasOwnProperty(key)) {
                
                if (!this.attributes[key]) {
                    return false;
                }

                if (!this.attributes[key].getStackValidity(attributes[key])) {
                    return false;
                }
            }
        }

        return true;
    }
}