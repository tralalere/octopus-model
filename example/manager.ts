/**
 * Created by Christophe on 24/10/2017.
 */
import {ModelsManager} from "../src/models-manager.class";
import {Validators} from "../src/validators/validators.class";

var manager:ModelsManager = new ModelsManager();

manager.addSchema("schema1", {
    key1: {
        defaultValue: "val1",
        validator: Validators.string()
    },
    key2: {
        defaultValue: "val2",
        validator: Validators.string()
    }
});

manager.extendsSchema("schema1", {
    additions: {
        key3: {
            defaultValue: "val3",
            validator: Validators.string()
        }
    },
    deletions: [
        "key1"
    ]
});

var t1:Object = manager.getDefaults("schema1", 0);
console.log(t1);

t1["key2"] = "Valeur de test";

var t2:Object = manager.update("schema1", t1);
console.log(t2);