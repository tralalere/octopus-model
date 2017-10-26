import {ModelSchema} from "../src/schema/model-schema.class";
import {Structures} from "../src/structures/structures.class";
import {VersionedAttributes} from "../src/interfaces/versioned-attributes.interface";

var schema:ModelSchema = new ModelSchema({
    key1: Structures.string("default1"),
    key2: Structures.string("default2"),
    key3: Structures.string("default3")
});

schema.addVersion(1, {
    additions: {
        key4: Structures.string("default4")
    },
    deletions: [
        "key3"
    ]
});

console.log(schema.getVersionedAttributes({
    key1: "ok1",
    key2: "ok2",
    key3: "ok3",
    key4: "ok4",
}));

/*var cc:VersionedAttributes = {
    version: 1,
    attributes: {
        v0_key1: "ok1",
        v0_key2: "ok2",
        v0_key3: "ok3",
        v1_key4: "ok4"
    }
};

console.log(schema.getFromVersionedAttributes(cc, 1));*/