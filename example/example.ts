/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchema} from "../src/model-schema.class";
import {Validators} from "../src/validators/validators.class";

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
    },
    deletions: [
        
    ]
});

var b:boolean = schema1.validateModel({
    id: 50,
    label: "ozetestrerk"
});


console.log ("result", b);
document.write(String(b));
