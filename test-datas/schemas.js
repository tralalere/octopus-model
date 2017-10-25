var octopusModel = require('../dist/bundle.js');
var ModelSchema = octopusModel.ModelSchema;
var Validators = octopusModel.Validators;

var schemas = {

    schema1: new ModelSchema({
        key1: {
            defaultValue: "",
            validator: Validators.string()
        },
        key2: {
            defaultValue: "",
            validator: Validators.string()
        }
    }),

    testCase1: {
        key1: "ok",
        key2: "ok"
    }
};



module.exports = schemas;