import {ModelsManager} from "../src/models-manager.class";
import {Structures} from "../src/structures/structures.class";

var manager:ModelsManager = new ModelsManager(true);

manager.addSchema("schema1", {
    key1: Structures.string("val1"),
    key2: Structures.string("val2"),
    key3: Structures.string("val3")
});

manager.extendsSchema("schema1", {
    additions: {
        key4: Structures.string("val4")
    },
    deletions: [
        "key3"
    ]
});

manager.extendsSchema("schema1", {
    additions: {
        key5: Structures.number(5)
    },
    deletions: [
        "key2"
    ]
});

// version client
var val1_0:Object = manager.getDefaults("schema1", {
    key1: "hihihi",
    key2: "hohoho"
}, 0);

console.log("val1_0", val1_0);

var validated = manager.validate("schema1", val1_0, 0);
console.log("Validé", validated);

var val1_0v = manager.toStoreData("schema1", val1_0, 0);
console.log("val1_0v", val1_0v);



// version mongo
var val1_1 = manager.getDefaults("schema1");
console.log("val1_1", val1_1);

var val1_1v = manager.toStoreData("schema1", val1_1);
console.log("val1_1v", val1_1v);


// cet objet est celui enregistré dans la DB
var merged = ModelsManager.mergeVersions(val1_1v, val1_0v);
console.log("merged", merged);

// on tente de repasser en version 0
var v0 = manager.toClientData("schema1", merged, 0);
console.log("nouvelle v0", v0);

var v1 = manager.toClientData("schema1", merged, 1);
console.log("nouvelle v1", v1);

var blindValidation = manager.blindValidate("schema1", v1);
console.log("blind", blindValidation);