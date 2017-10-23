/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchema} from "../src/model-schema.class";
import {Validators} from "../src/validators/validators.class";
import {Generators} from "../src/generators/generators.class";
import {ModelSchemaExtension} from "../src/interfaces/model-schema-extension.interface";
import {ExtendedModelSchema} from "../src/extended-model-schema.class";

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

let subsub:ExtendedModelSchema = subSchema.addVersion(1, {
    additions: {
        test: {
            defaultValue: "ttt",
            validator: Validators.string()
        }
    }
});

schema1.addVersion(2, {
    additions: {
        arr: {
            defaultValue: Generators.array(subsub, 5),
            validator: Validators.array().schema(subSchema)
        }
    },
    deletions: [
        "label"
    ]
});


console.log(schema1.validateModel({
    id: 50,
    text: "ozetestrerk",
    isvalid: false
}, 2));

console.log("0", schema1.generateModel(0));
console.log("1", schema1.generateModel(1));

var m:Object = schema1.generateModel(2);
console.log("2", schema1.generateModel(2));

//console.log(schema1.validateModel(m))

/*console.log ("result", b);
document.write(String(b));*/
