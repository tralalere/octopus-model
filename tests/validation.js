var expect = require('chai').expect;
var structures = require("./structures.js");

describe('Structures validation', function() {

    for (const key in structures) {
        if (structures.hasOwnProperty(key)) {

            if (Array.isArray(structures[key]["positive"])) {

                structures[key]["positive"].forEach(function (elemb, index) {
                    it(key + " positive " + index, function() {
                        var elem = structures[key];
                        expect(elem["structure"].getStackValidity(elemb)).to.equal(true);
                    });
                });

            } else {
                it(key + " positive", function() {
                    var elem = structures[key];
                    expect(elem["structure"].getStackValidity(elem["positive"])).to.equal(true);
                });
            }


            if (Array.isArray(structures[key]["negative"])) {
                
                structures[key]["negative"].forEach(function (elemb, index) {
                    //console.log(key);
                    it(key + " negative " + index, function() {
                        var elem = structures[key];
                        expect(elem["structure"].getStackValidity(elemb)).to.equal(false);
                    });
                });

            } else {
                it(key + " negative", function() {
                    var elem = structures[key];
                    expect(elem["structure"].getStackValidity(elem["negative"])).to.equal(false);
                });
            }

        }
    }
});