# bforest
A binary random access list class based on C. Okasaki's book, *Purely Functional Data Structures*.  It is a hybrid data structure that uses a linked list of binary trees that mimic the digits in a binary number.  This implementation uses a sparse list of complete binary trees.

## Install

~~~bash
git clone https://github.com/alecroy/bforest.git
cd bforest
npm install
~~~

## Tests / Behavior

~~~bash
$ grunt test
Running "simplemocha:all" (simplemocha) task


  the BForest data structure
    constructs forests
      ✓ a new BForest is empty
      ✓ a new BForest([]) is empty
      ✓ a new BForest([1, 2, 3]) is not empty
      ✓ empty.head() is null
      ✓ empty.tail() is not null
      ✓ empty.tail() is empty
    can be prepended like a list
      ✓ empty.prepend([1, 2, 3]) is BForest([1, 2, 3])
    has a head & tail just like a list
      ✓ the head of [1, 2, 3] is 1
      ✓ the tail of [1, 2, 3] is [2, 3]
      ✓ the head of the tail of [1, 2, 3] is 2
    prints just like a list
      ✓ empty is '[]'
      ✓ [1, 2, 3] prints as '[1, 2, 3]'
      ✓ the tail of [1, 2, 3] is '[2, 3]'
    conses just like a list
      ✓ 1 cons [] is [1]
      ✓ 1 cons 2 cons [] is [1, 2]
      ✓ 1 cons [2, 3, 4, 5] is [1, 2, 3, 4, 5]
    can be iterated over just like a list
      ✓ functions iterate over elements in left-to-right order
      ✓ non-destructive functions do not change the BForest
      ✓ destructive functions can modify elements
    can be mapped over just like a list
      ✓ mapping x -> x*x over [1, 2, 3, 4] gives [1, 4, 9, 16]
      ✓ non-destructive functions do not change the BForest
      ✓ destructive functions can modify its elements
    can be indexed just like a list
      ✓ [1, 2, 3][0] is 1, [1, 2, 3][1] is 2, [1, 2, 3][2] is 3
      ✓ [1, 2, 3][999] is null
      ✓ [1, 2, 3][-1] is null
      ✓ [1, 2, 3][undefined] is null
      ✓ [1, 2, 3][null] is null
      ✓ [1, 2, 3][NaN] is null
    can be updated non-destructively like a list
      ✓ [1, 2, 3][1] = 'foo' makes [1, foo, 3]
      ✓ [1, 2, 3][1] = 'foo' does not modify [1, 2, 3]


  30 passing (29ms)


Done, without errors.
~~~

## Usage

~~~javascript
var BForest = require('./bforest');
var bf = new BForest([1, 2, 3]);

console.log(bf.toString()); // [1, 2, 3]
bf.iter(console.log);
// 1
// 2
// 3
~~~
