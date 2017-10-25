/**
 * Created by Christophe on 25/10/2017.
 */
import {ModelSchema} from "../src/schema/model-schema.class";
import {Structures} from "../src/structures/structures.class";

var schema1:ModelSchema = new ModelSchema({
    key1: Structures.string("yep").minLength(3).maxLength(10),
    key2: Structures.string("yop")
});

var test:boolean = schema1.validateModel({
    key1: "fsdfdsfsdf",
    key2: "huhu"
});

var schema2:ModelSchema = new ModelSchema({
    keyA: Structures.object(schema1)
});

schema2.addVersion(1, {
    additions: {
        keyB: Structures.array(["ok", "ok"])
    }
});

schema2.addVersion(2, {
    additions: {
        keyC: Structures.array(schema1, 5)
    }
});

console.log(test);

var generated:Object = schema2.generateModel();
console.log(generated);