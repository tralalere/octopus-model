/**
 * Created by Christophe on 20/10/2017.
 */
import {ModelSchemaAttributes} from "./model-schema-attributes.interface";

export interface ModelSchemaExtension {
    additions?:ModelSchemaAttributes;
    deletions?:string[];
}