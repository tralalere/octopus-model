/**
 * Created by Christophe on 25/10/2017.
 */
import {ModelSchema} from "../src/schema/model-schema.class";
import {Structures} from "../src/structures/structures.class";

var schema1:ModelSchema = new ModelSchema({
    key1: Structures.string("yep").maxLength(10),
    key2: Structures.string("yop")
});

var test:boolean = schema1.validateModel({
    key1: "hihidsqdqsdqsdqsdsqdqsdqs",
    key2: "huhu"
});

console.log(test);