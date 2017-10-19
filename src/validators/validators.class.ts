/**
 * Created by Christophe on 17/10/2017.
 */
import {StringValidator} from "./string-validator.class";
import {NumberValidator} from "./number-validator.class";
import {ArrayValidator} from "./array-validator.class";
import {ObjectValidator} from "./object-validator.class";
import {Validator} from "./validator.class";

export class Validators {

    static string():StringValidator {

        return new StringValidator((val:any) => {
            return (typeof val) === "string";
        });
    }

    static number():NumberValidator {

        return new NumberValidator((val:any) => {
            return (typeof val) === "number";
        });
    }
    
    static array():ArrayValidator {
        
        return new ArrayValidator((val:any) => {
            return Array.isArray(val);
        });
    }

    static object():ObjectValidator {

        return new ObjectValidator((val:any) => {
            return (typeof val) === "object";
        });
    }

    static boolean():Validator {

        return new Validator((val:any) => {
            return (typeof val) === "boolean";
        });
    }
}