/**
 * Created by Christophe on 23/10/2017.
 */
import {Generator} from "./generator.class";
import {DataSchema} from "../data-schema.class";

export class Generators {

    static array(value:any|DataSchema, length:number = 1) {

        return new Generator(() => {
            let arr:any[] = [];

            if (value instanceof DataSchema) {
                for (let i:number = 0; i < length; i++) {
                    arr.push((value as DataSchema).generateModel());
                }
            } else {
                for (let i:number = 0; i < length; i++) {
                    arr.push(value);
                }
            }

            return arr;
        });
    }

    static object(schema:DataSchema) {

        return new Generator(() => {
            return schema.generateModel();
        });
    }
}