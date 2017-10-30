/**
 * Created by Christophe on 17/10/2017.
 */
import {StringStructure} from "./string-structure.class";
import {NumberStructure} from "./number-structure.class";
import {ArrayStructure} from "./array-structure.class";
import {ObjectStructure} from "./object-structure.class";
import {Structure} from "./structure.class";
import {DataSchema} from "../schema/data-schema.class";

export class Structures {

    static string(defaultValue:string = ""):StringStructure {

        return new StringStructure((val:any) => {
            return (typeof val) === "string";
        }, defaultValue);
    }

    static number(defaultValue:number = 0):NumberStructure {

        return new NumberStructure((val:any) => {
            return (typeof val) === "number";
        }, defaultValue);
    }
    
    static array(defaultValue:any[]|DataSchema|Structure = [], length:number = 1):ArrayStructure {
        
        return new ArrayStructure((val:any) => {
            return Array.isArray(val);
        }, defaultValue, length);
    }

    static object(defaultValue:Object|DataSchema = {}):ObjectStructure {

        return new ObjectStructure((val:any) => {
            return (typeof val) === "object" && !Array.isArray(val);
        }, defaultValue);
    }

    static boolean(defaultValue:boolean = false):Structure {

        return new Structure((val:any) => {
            return (typeof val) === "boolean";
        }, defaultValue);
    }

    static custom(func:Function):Structure {

        return new Structure((val:any) => {
            return func(val);
        }, null);
    }
}