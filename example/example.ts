/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchema} from "../src/model-schema.class";
import {Validators} from "../src/validators/validators.class";

var schema1:ModelSchema = new ModelSchema(1, {
    label: Validators.string().contains("test"),
    text: Validators.string().maxLength(20),
    linkedid: Validators.number().positive(),
    val: Validators.number().min(20).max(150),
    testobj: Validators.object(),
    testarray: Validators.array().length(2)
});

var b:boolean = schema1.validateModel({
    label: "ozetestrerk",
    text: "hihihihihi",
    linkedid: 67,
    val: 30,
    testobj: {key1: "ok"},
    testarray: [1, 3]
});


console.log ("result", b);
