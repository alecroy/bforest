'use strict';

var BForest = require('../bforest');
var expect = require('chai').expect;

expect(BForest).to.not.equal(null);

describe('the BForest data structure', function() {
  it('should be empty when created', function() {
    expect(new BForest().isEmpty()).to.be.true;
  });

  it('empty.head() should be null', function() {
    expect(new BForest().head()).to.be.null;
  });

  it('empty.tail() should not be null', function() {
    expect(new BForest().tail()).to.not.be.null;
  });

  it('empty.tail() should be empty', function() {
    expect(new BForest().tail().isEmpty()).to.be.true;
  });
});
