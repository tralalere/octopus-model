var expect = require('chai').expect;
var schemas = require("../test-datas/schemas.js");

describe('Validation', function() {

    it("-->", function() {
        expect(schemas.schema1.validateModel(schemas.testCase1)).to.equal(true);
    });
});