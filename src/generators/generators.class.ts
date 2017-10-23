/**
 * Created by Christophe on 23/10/2017.
 */
import {ModelSchema} from "../model-schema.class";
import {Generator} from "./generator.class";

export class Generators {

    static array(value:any|ModelSchema, length:number) {

        return new Generator(() => {
            var arr:any[] = [];

            if (value instanceof ModelSchema) {
                for (let i:number = 0; i < length; i++) {
                    arr.push((value as ModelSchema).generateModel());
                }
            } else {
                for (let i:number = 0; i < length; i++) {
                    arr.push(value);
                }
            }

            return arr;
        });
    }
}