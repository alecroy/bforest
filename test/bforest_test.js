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

  describe('prints just like a list', function() {
    it('empty is []', function() {
      expect(new BForest().toString()).to.equal('[]');
    });

    var oneTwoThree = new BForest().prepend([1, 2, 3]);
    it('prepending [1, 2, 3] to [] should make [1, 2, 3]', function() {
      expect(oneTwoThree.toString()).to.equal('[1, 2, 3]');
    });

    it('the head of [1, 2, 3] should be 1', function() {
      expect(oneTwoThree.head()).to.equal(1);
    });

    it('the tail of [1, 2, 3] should be [2, 3]', function() {
      expect(oneTwoThree.tail().toString()).to.equal('[2, 3]');
    });
  });
});
