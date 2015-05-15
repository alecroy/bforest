# bforest
A binary random access list class based on C. Okasaki's book, *Purely Functional Data Structures*.

## Install

~~~bash
git clone https://github.com/alecroy/bforest.git
cd bforest
npm install
~~~

## Tests / Behavior

~~~bash
grunt test

  the BForest data structure
    ✓ should be empty when created
    ✓ empty.head() should be null
    ✓ empty.tail() should not be null
    ✓ empty.tail() should be empty
    prints just like a list
      ✓ empty is []
      ✓ prepending [1, 2, 3] to [] should make [1, 2, 3]
      ✓ the head of [1, 2, 3] should be 1
      ✓ the tail of [1, 2, 3] should be [2, 3]
      ✓ the head of the tail of [1, 2, 3] should be 2
    conses just like a list
      ✓ 1 cons [] should be [1]
      ✓ 1 cons 2 cons [] should be [1, 2]
      ✓ 1 cons [2, 3, 4, 5] should be [1, 2, 3, 4, 5]
    can be iterated over just like a list
      ✓ should push [1, 2, 3] onto an empty array in 1 2 3 order
    can be mapped over just like a list
      ✓ mapping x -> x*x over [1, 2, 3, 4] gives [1, 4, 9, 16]
      ✓ mapping over a list does not change the list


  15 passing (15ms)


Done, without errors.
~~~

## Usage

~~~javascript
var BForest = require('./bforest');
var bf = new BForest();

console.log(bf.prepend([1, 2, 3]).toString()); // [1, 2, 3]
console.log(bf.toString()); // []
~~~
