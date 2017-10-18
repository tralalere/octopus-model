/**
 * Created by Christophe on 17/10/2017.
 */
import {StringValidator} from "./string-validator.class";
import {NumberValidator} from "./number-validator.class";
import {ArrayValidator} from "./array-validator.class";
import {ObjectValidator} from "./object-validator.class";

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
            return true;
        });
    }

    static object():ObjectValidator {

        return new ObjectValidator((val:any) => {
            return (typeof val) === "object";
        });
    }
}