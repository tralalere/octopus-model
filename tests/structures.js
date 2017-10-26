var octopusModel = require('../dist/bundle.js');
var Structures = octopusModel.Structures;
var ModelSchema = octopusModel.ModelSchema;

var subSchema1 = new ModelSchema({
    key11: Structures.string(),
    key12: Structures.number(),
    key13: Structures.boolean()
});

var subShemaData1True = {
    key11: "abc",
    key12: 7,
    key13: false
};

var subShemaData1False = {
    key11: "abc",
    key12: 7,
    key13: "abc"
};

var subSchema2 = new ModelSchema({
    key21: Structures.number().positive(),
    key22: Structures.string("").maxLength(10),
    key23: Structures.object().schema(subSchema1)
});

var subSchemaData2True = {
    key21: 45,
    key22: "abc",
    key23: subShemaData1True
};

var subSchemaData2False = {
    key21: 45,
    key22: "abc",
    key23: subShemaData1False
};

var structures = {
    nonNull: {
        structure: Structures.string().nonNull(),
        positive: "abc",
        negative: null
    },
    string: {
        structure: Structures.string().minLength(5).maxLength(10).contains("45"),
        positive: [
            "12345678",

            // TODO: attention à ce cas
            //null
        ],
        negative: [
            "abc",
            "abcdefghijkl",
            "abcdefg",
            25,
            true,
            [],
            {}
        ]
    },
    stringRegExp: {
        structure: Structures.string().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        positive: "test@gmail.com",
        negative: [
            "abcd"
        ]
    },
    number: {
        structure: Structures.number().min(8).max(25),
        positive: 10,
        negative: [
            77,
            [],
            {},
            false,
            "test"
        ]
    },
    numberPositive: {
        structure: Structures.number().positive(),
        positive: 5,
        negative: -10
    },
    boolean: {
        structure: Structures.boolean(),
        positive: [
            true,
            false
        ],
        negative: [
            77,
            "abc",
            [],
            {}
        ]
    },
    object: {
        structure: Structures.object(),
        positive: [
            {},
            {
                testKey: "testVal"
            }
        ],
        negative: [
            [],
            false,
            true,
            "abc",
            77
        ]
    },
    complexObject1: {
        structure: Structures.object().schema(subSchema2),
        positive: [
            subSchemaData2True
        ],
        negative: [
            subSchemaData2False,
            {}
        ]
    },
    complexObject2: {
        structure: Structures.object().keySchema("test", subSchema2),
        positive: [
            {
                test: subSchemaData2True
            }
        ],
        negative: [
            {
                test: subSchemaData2False
            },
            {
                test2: subSchemaData2True
            },
            {}
        ]
    },
    array: {
        structure: Structures.array(),
        positive: [
            [],
            ["ab", "cd"]
        ],
        negative: [
            77,
            "abc",
            true,
            false,
            {}
        ]
    },
    complexArray: {
        structure: Structures.array().length(3).schema(subSchema2),
        positive: [
            [
                subSchemaData2True,
                subSchemaData2True,
                subSchemaData2True
            ]
        ],
        negative: [
            [
                subSchemaData2True,
                subSchemaData2False,
                subSchemaData2True
            ],
            [],
            [
                subSchemaData2True,
                subSchemaData2True
            ]
        ]
    }
};

module.exports = structures;