'use strict';

var BForest = function() {
  this.trees = [];
}

BForest.prototype.prepend = function(array) {
  if (array === undefined) {
    return this;
  }
  var bf = this;
  for (var i = array.length - 1; i >= 0; i--) {
    bf = bf.cons(array[i]);
  }
  return bf;
};

BForest.prototype.isEmpty = function() {
  return (this.length === 0);
};

function first(tree) { // TODO eliminate node variable
  var node = tree;
  while (node.left !== null) {
    node = node.left;
  }
  return node.value;
}

BForest.prototype.head = function() { // TODO empty && return .. ; ..
  if (this.isEmpty()) {
    return null;
  } else {
    return first(this.trees[0]); // TODO eliminate first(..)
  }
};

BForest.prototype.cons = function(element) {
  var bf = new BForest();
  var newTree = { size: 1, value: element, left: null, right: null};

  for (var i = 0; i < this.trees.length; i++) {
    if (this.trees[i].size > newTree.size) {
      bf.trees = [newTree].concat(this.trees.slice(i));
      return bf;
    }
    newTree = {size: 2 * newTree.size, left: newTree, right: this.trees[i]};
  }

  bf.trees = [newTree];
  return bf;
};

function iterTree(fn, tree) {
  if (tree.left === null) { // Leaf
    fn(tree.value);
  } else {
    iterTree(fn, tree.left);
    iterTree(fn, tree.right);
  }
}

BForest.prototype.iter = function(fn) {
  for (var i = 0; i < this.trees.length; i++) {
    iterTree(fn, this.trees[i]); // TODO eliminate iterTree(..)
  }
};

function mapTree(fn, tree) {
  if (tree.size === 1) {
    return {size: 1, value: fn(tree.value), left: null, right: null};
  } else {
    var newLeft = mapTree(fn, tree.left);
    var newRight = mapTree(fn, tree.right);
    return {size: tree.size, left: newLeft, right: newRight};
  }
}

BForest.prototype.map = function(fn) {
  var bf = new BForest();

  for (var i = 0; i < this.trees.length; i++) {
    bf.trees.push(mapTree(fn, this.trees[i]));
  }

  return bf;
}

BForest.prototype.tail = function() {
  if (this.isEmpty()) { return null; }

  var bf = new BForest();
  if (this.trees[0].size > 1) { // Need to break apart first tree
    var ptr = this.trees[0];

    while (ptr !== null && ptr.right !== null) {
      bf.trees.push(ptr.right); // Collect the trees on the right
      ptr = ptr.left; // Recurse down the left side of the tree
    }

    bf.trees.reverse(); // Last tree pushed on is the smallest/'first'
  }

  bf.trees = bf.trees.concat(this.trees.slice(1)); // Keep old trees
  return bf;
}

BForest.prototype.index = function(index) {
  if (this.isEmpty()) { return null; }

  for (var i = 0; i < this.trees.length; i++) {
    if (index < this.trees[i].size) { // It's in this tree
      var ptr = this.trees[i];
      while (ptr.left !== null) {
        if (index < ptr.left.size) { // index < 2^n
          ptr = ptr.left; // [0..2^n] -> [0..2^(n-1)]
        } else {
          index -= ptr.left.size; // [0..2^n] -> [2^(n-1)..2^n] - 2^(n-1)
          ptr = ptr.right;
        }
      }
      return ptr.value; // ptr.left is null, we must be at a leaf
    } else { // It's in a later tree, subtract from index # skipped
      index -= this.trees[i].size;
    }
  }
  return null; // We looked at all the trees and didn't find [i]
};

function updateTree(tree, index, value) {
  if (tree.size === 1) {
    return {size: 1, left: null, right: null, value: value};
  } else {
    var newTree = {size: tree.size, left: tree.left, right: tree.right};
    if (index < tree.left.size) {
      newTree.left = updateTree(tree.left, index, value);
    } else {
      newTree.right = updateTree(tree.right, index - tree.right.size, value);
    }
    return newTree;
  }
}

BForest.prototype.update = function(index, value) {
  if (this.isEmpty()) { return null; }

  for (var i = 0; i < this.trees.length; i++) {
    if (index >= this.trees[i].size) { // It's in a later tree
      index -= this.trees[i].size; // Subtract from index # skipped
      continue;
    }

    var bf = new BForest();
    bf.trees = this.trees.slice(0, i); // Collect all trees before
    bf.trees.push(updateTree(this.trees[i], index, value));
    bf.trees = bf.trees.concat(this.trees.slice(i + 1)); // And after
    return bf;
  }
  return this; // Updated nothing! Return the original tree
};

BForest.prototype.toString = function() {
  var strings = [];
  this.iter(function(elt) { strings.push(elt.toString()); });
  return '[' + strings.join(', ') + ']';
}

module.exports = BForest;
