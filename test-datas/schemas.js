var octopusModel = require('../dist/bundle.js');
var ModelsManager = octopusModel.ModelsManager;
var Structures = octopusModel.Structures;

var manager = new ModelsManager();

manager.addSchema("schema1", {
    key1: Structures.string("val1").minLength(3).maxLength(20)
});

var testSchemas = {


};


module.exports = testSchemas;