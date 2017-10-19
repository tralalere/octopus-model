/**
 * Created by Christophe on 19/10/2017.
 */
import {Validator} from "./validators/validator.class";

export interface ModelSchemaAttributes {
    [key:string]: {
        defaultValue:any,
        validator:Validator,
        required?:boolean
    }
}