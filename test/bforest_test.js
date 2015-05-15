'use strict';

var BForest = require('../bforest');
var expect = require('chai').expect;

expect(BForest).to.not.equal(null);

describe('the BForest data structure', function() {
  it('should be empty when created', function() {
    var bf = new BForest();
    expect(bf.isEmpty()).to.be.true;
  });
});
