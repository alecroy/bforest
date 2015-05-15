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

    it('the head of the tail of [1, 2, 3] should be 2', function() {
      expect(oneTwoThree.tail().head()).to.equal(2);
    });
  });

  describe('conses just like a list', function() {
    it('1 cons [] should be [1]', function() {
      expect(new BForest().cons(1).toString()).to.equal('[1]');
    });

    it('1 cons 2 cons [] should be [1, 2]', function() {
      expect(new BForest().cons(2).cons(1).toString()).to.equal('[1, 2]');
    });

    it('1 cons [2, 3, 4, 5] should be [1, 2, 3, 4, 5]', function() {
      var twoThreeFourFive = new BForest().prepend([2, 3, 4, 5]);
      expect(twoThreeFourFive.cons(1).toString()).to.equal('[1, 2, 3, 4, 5]');
    });
  });

  describe('can be iterated over just like a list', function() {
    it('should push [1, 2, 3] onto an empty array in 1 2 3 order', function() {
      var array = [];
      var oneTwoThree = new BForest().prepend([1, 2, 3]);

      oneTwoThree.iter(function(elt) { array.push(elt); });
      expect(array).to.eql([1, 2, 3]);
    });
  });

  describe('can be mapped over just like a list', function() {
    it('mapping x -> x*x over [1, 2, 3, 4] gives [1, 4, 9, 16]', function() {
      var numbers = new BForest().prepend([1, 2, 3, 4]);
      var squares = numbers.map(function(x) { return x * x; });
      expect(squares.toString()).to.equal('[1, 4, 9, 16]');
    });

    it('mapping over a list does not change the list', function() {
      var numbers = new BForest().prepend([1, 2, 3, 4]);
      numbers.map(function(x) { return x * x; });
      expect(numbers.toString()).to.equal('[1, 2, 3, 4]');
    });
  });


});
