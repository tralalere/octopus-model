/**
 * Created by Christophe on 17/10/2017.
 */
import {ModelSchema} from "../src/model-schema.class";
import {Validator} from "../src/validators/validator.class";

var schema1:ModelSchema = new ModelSchema(1, {
    label: Validator.string().contains("test"),
    text: Validator.string().maxLength(20)
});

var b:boolean = schema1.validateModel({
    label: "ozetestrerk",
    text: "hihihihihi"
});


console.log ("result", b);
