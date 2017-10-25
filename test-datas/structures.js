var octopusModel = require('../dist/bundle.js');
var Structures = octopusModel.Structures;

var structures = {
    string: {
        structure: Structures.string(),
        positive: "ok",
        negative: [
            25,
            true,
            [],
            {}
        ]
    },
    stringMin: {
        structure: Structures.string().minLength(5),
        positive: "12345678",
        negative: "12"
    },
    stringMax: {
        structure: Structures.string().maxLength(10),
        positive: "12345",
        negative: "123456789000000"
    },
    stringContains: {
        structure: Structures.string().contains("test"),
        positive: "ytesty",
        negative: "yop"
    },
    stringRegExp: {
        structure: Structures.string().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        positive: "test@gmail.com",
        negative: "hihi"
    },
    numberMin: {
        structure: Structures.number().min(8),
        positive: 10,
        negative: 5
    },
    numberMax: {
        structure: Structures.number().max(8),
        positive: 5,
        negative: 10
    },
    numberPositive: {
        structure: Structures.number().positive(),
        positive: 5,
        negative: -10
    },
    complexNumber: {
        structure: Structures.number().min(15).max(30).nonNull(),
        positive: 20,
        negative: [
            3,
            78,
            null
        ]

    }
};

module.exports = structures;