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
~~~

## Usage

~~~javascript
var BForest = require('./bforest');
var bf = new BForest();

console.log(bf.prepend([1, 2, 3]).toString()); // [1, 2, 3]
console.log(bf.toString()); // []
~~~
