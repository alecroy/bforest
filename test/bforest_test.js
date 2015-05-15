'use strict';

var BForest = require('../bforest');
var expect = require('chai').expect;

expect(BForest).to.not.equal(null);

describe('the BForest data structure', function() {
  describe('constructs forests', function() {
    it('a new BForest is empty', function() {
      expect(new BForest().isEmpty()).to.be.true;
    });

    it('a new BForest([]) is empty', function() {
      expect(new BForest([]).isEmpty()).to.be.true;
    });

    it('a new BForest([1, 2, 3]) is not empty', function() {
      expect(new BForest([1, 2, 3]).isEmpty()).to.be.false;
    });

    it('empty.head() is null', function() {
      expect(new BForest().head()).to.be.null;
    });

    it('empty.tail() is not null', function() {
      expect(new BForest().tail()).to.not.be.null;
    });

    it('empty.tail() is empty', function() {
      expect(new BForest().tail().isEmpty()).to.be.true;
    });
  });

  describe('can be prepended like a list', function() {
    it('empty.prepend([1, 2, 3]) is BForest([1, 2, 3])', function() {
      var initialized = new BForest([1, 2, 3]);
      var prepended = new BForest().prepend([1, 2, 3]);
      expect(initialized).to.eql(prepended);
    });
  });

  describe('has a head & tail just like a list', function() {
    var oneTwoThree = new BForest().prepend([1, 2, 3]);

    it('the head of [1, 2, 3] is 1', function() {
      expect(oneTwoThree.head()).to.equal(1);
    });

    it('the tail of [1, 2, 3] is [2, 3]', function() {
      expect(oneTwoThree.tail()).to.eql(new BForest([2, 3]));
    });

    it('the head of the tail of [1, 2, 3] is 2', function() {
      expect(oneTwoThree.tail().head()).to.equal(2);
    });
  });

  describe('prints just like a list', function() {
    var oneTwoThree = new BForest().prepend([1, 2, 3]);

    it('empty is \'[]\'', function() {
      expect(new BForest().toString()).to.equal('[]');
    });

    it('[1, 2, 3] prints as \'[1, 2, 3]\'', function() {
      expect(oneTwoThree.toString()).to.equal('[1, 2, 3]');
    });

    it('the tail of [1, 2, 3] is \'[2, 3]\'', function() {
      expect(oneTwoThree.tail().toString()).to.equal('[2, 3]');
    });
  });

  describe('conses just like a list', function() {
    it('1 cons [] is [1]', function() {
      expect(new BForest().cons(1).toString()).to.equal('[1]');
    });

    it('1 cons 2 cons [] is [1, 2]', function() {
      expect(new BForest().cons(2).cons(1).toString()).to.equal('[1, 2]');
    });

    it('1 cons [2, 3, 4, 5] is [1, 2, 3, 4, 5]', function() {
      var twoThreeFourFive = new BForest().prepend([2, 3, 4, 5]);
      expect(twoThreeFourFive.cons(1).toString()).to.equal('[1, 2, 3, 4, 5]');
    });
  });

  describe('can be iterated over just like a list', function() {
    it('functions iterate over elements in left-to-right order', function() {
      var array = [];
      var oneTwoThree = new BForest().prepend([1, 2, 3]);

      oneTwoThree.iter(function(elt) { array.push(elt); });
      expect(array).to.eql([1, 2, 3]);
    });

    it('non-destructive functions do not change the BForest', function() {
      var numbers = new BForest().prepend([1, 2, 3, 4]);
      numbers.iter(function(x) { return x * x; });
      expect(numbers.toString()).to.equal('[1, 2, 3, 4]');
    });

    it('destructive functions can modify elements', function() {
      var oneTwoThree = new BForest().prepend([[1], [2], [3]]);
      oneTwoThree.iter(function(elt) { elt[0] += 100; });
      expect(oneTwoThree.toString()).to.eql('[101, 102, 103]');
    });
  });

  describe('can be mapped over just like a list', function() {
    it('mapping x -> x*x over [1, 2, 3, 4] gives [1, 4, 9, 16]', function() {
      var numbers = new BForest().prepend([1, 2, 3, 4]);
      var squares = numbers.map(function(x) { return x * x; });
      expect(squares.toString()).to.equal('[1, 4, 9, 16]');
    });

    it('non-destructive functions do not change the BForest', function() {
      var numbers = new BForest().prepend([1, 2, 3, 4]);
      numbers.map(function(x) { return x * x; });
      expect(numbers.toString()).to.equal('[1, 2, 3, 4]');
    });

    it('destructive functions can modify its elements', function() {
      var arrays = new BForest().prepend([[1], [2], [3]]);
      var fives = arrays.map(function(elt) { elt[0] += 100; return 5; });
      expect(arrays.toString()).to.equal('[101, 102, 103]');
      expect(fives.toString()).to.equal('[5, 5, 5]');
    });
  });

  describe('can be indexed just like a list', function() {
    it('[1, 2, 3][0] is 1, [1, 2, 3][1] is 2, [1, 2, 3][2] is 3', function() {
      var oneTwoThree = new BForest().prepend([1, 2, 3]);
      expect(oneTwoThree.index(0)).to.equal(1);
      expect(oneTwoThree.index(1)).to.equal(2);
      expect(oneTwoThree.index(2)).to.equal(3);
    });

    it('[1, 2, 3][999] is null', function() {
      expect(new BForest().prepend([1, 2, 3]).index(999)).to.be.null;
    });

    it('[1, 2, 3][-1] is null', function() {
      expect(new BForest().prepend([1, 2, 3]).index(-1)).to.be.null;
    });

    it('[1, 2, 3][undefined] is null', function() {
      expect(new BForest().prepend([1, 2, 3]).index(undefined)).to.be.null;
    });

    it('[1, 2, 3][null] is null', function() {
      expect(new BForest().prepend([1, 2, 3]).index(null)).to.be.null;
    });

    it('[1, 2, 3][NaN] is null', function() {
      expect(new BForest().prepend([1, 2, 3]).index(NaN)).to.be.null;
    });
  });

  describe('can be updated non-destructively like a list', function() {
    it('[1, 2, 3][1] = \'foo\' makes [1, foo, 3]', function() {
      var oneTwoThree = new BForest().prepend([1, 2, 3]);
      var oneFooThree = oneTwoThree.update(1, 'foo');
      expect(oneFooThree.toString()).to.equal('[1, foo, 3]');
    });

    it('[1, 2, 3][1] = \'foo\' does not modify [1, 2, 3]', function() {
      var oneTwoThree = new BForest().prepend([1, 2, 3]);
      oneTwoThree.update(1, 'foo');
      expect(oneTwoThree.toString()).to.equal('[1, 2, 3]');
    });
  });
});
