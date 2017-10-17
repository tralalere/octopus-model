/**
 * Created by Christophe on 17/10/2017.
 */
import {StringValidator} from "./string-validator.class";

export class Validator {

    static string():StringValidator {

        return new StringValidator((val:any) => {
            return (typeof val) === "string";
        });

    }
}