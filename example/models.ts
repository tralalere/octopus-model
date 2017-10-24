/**
 * Created by Christophe on 23/10/2017.
 */
import {Model} from "../src/model/model.class";
import {ModelSchema} from "../src/schema/model-schema.class";
import {Validators} from "../src/validators/validators.class";

var schema:ModelSchema = new ModelSchema({
    key1: {
        defaultValue: "defVal1",
        validator: Validators.string()
    },
    key2: {
        defaultValue: "defVal2",
        validator: Validators.string()
    }
});

schema.addVersion(1, {
    additions: {
        key3: {
            defaultValue: "defVal3",
            validator: Validators.string()
        }
    }
});

var model1:Model = new Model({
    key1: "val1",
    key2: "val2"
}, schema);

console.log("model1", model1.validated);

var model2:Model = new Model({
    version: 0,
    attributes: {
        key1: "val3",
        key2: "val4"
    }
}, schema);

console.log("model2", model2.validated);