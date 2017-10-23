/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchema} from "../src/model-schema.class";
import {Validators} from "../src/validators/validators.class";
import {Generators} from "../src/generators/generators.class";

/*var schema1:ModelSchema = new ModelSchema(1, {
    label: Validators.string().contains("test"),
    text: Validators.string().maxLength(20),
    linkedid: Validators.number().positive(),
    val: Validators.number().min(20).max(150),
    testobj: Validators.object(),
    testarray: Validators.array().length(2)
});*/


var schema1:ModelSchema = new ModelSchema({
    id: {
        defaultValue: 0,
        validator: Validators.number().positive()
    },
    label: {
        defaultValue: "",
        validator: Validators.string().maxLength(30)
    },
    text: {
        defaultValue: "",
        validator: Validators.string().maxLength(200),
        required: false
    }
});

schema1.addVersion(1, {
    additions: {
        isvalid: {
            defaultValue: false,
            validator: Validators.boolean()
        }
    }
});

let subSchema:ModelSchema = new ModelSchema({
    attr1: {
        defaultValue: "val attr1",
        validator: Validators.string()
    }
});

schema1.addVersion(2, {
    additions: {
        arr: {
            defaultValue: Generators.array(subSchema, 5),
            validator: Validators.array()
        }
    },
    deletions: [
        "label"
    ]
});

/*var b:boolean = schema1.validateModel({
    id: 50,
    label: "ozetestrerk"
});*/

console.log(schema1.validateModel({
    id: 50,
    text: "ozetestrerk",
    isvalid: false
}, 2));

console.log("0", schema1.generateModel(0));
console.log("1", schema1.generateModel(1));

console.log("2", schema1.generateModel(2));

/*console.log ("result", b);
document.write(String(b));*/
