'use strict';

function iterTree(fn, tree) {
    if (tree.left === null) { // Leaf, call the function
        fn(tree.value)
    } else {
        iterTree(fn, tree.left) // Left, then right
        iterTree(fn, tree.right)
    }
}

function mapTree(fn, tree) {
    if (tree.size === 1) {
        return {size: 1, value: fn(tree.value), left: null, right: null}
    } else {
        let newLeft = mapTree(fn, tree.left)
        let newRight = mapTree(fn, tree.right)

        return {size: tree.size, left: newLeft, right: newRight}
    }
}

function updateTree(tree, index, value) {
    if (tree.size === 1) {
        return {size: 1, left: null, right: null, value: value}
    }

    let newTree = {size: tree.size, left: tree.left, right: tree.right}
    if (index < tree.left.size) {
        newTree.left = updateTree(tree.left, index, value)
    } else {
        newTree.right = updateTree(tree.right, index - tree.right.size, value)
    }

    return newTree
}

class BForest {
    constructor(array) {
        this.trees = []
        if (array !== undefined) {
            this.trees = this.prepend(array).trees
        }
    }

    prepend(array) {
        if (array === undefined) {
            return this
        }

        let bf = this
        for (let i = array.length - 1; i >= 0; i--) {
            bf = bf.cons(array[i])
        }

        return bf
    }

    isEmpty() {
        return (this.trees.length === 0)
    }

    head() {
        if (this.isEmpty()) {
            return null
        }

        let ptr = this.trees[0]
        while (ptr.left !== null) {
            ptr = ptr.left // Go all the way left
        }

        return ptr.value
    }

    cons(element) {
        let bf = new BForest()
        let newTree = { size: 1, value: element, left: null, right: null}

        for (let i = 0; i < this.trees.length; i++) {
            if (this.trees[i].size > newTree.size) {
                bf.trees = [newTree].concat(this.trees.slice(i))
                return bf;
            }
            newTree = {size: 2 * newTree.size, left: newTree, right: this.trees[i]}
        }

        bf.trees = [newTree]
        return bf
    }

    iter(fn) {
        for (let i = 0; i < this.trees.length; i++) {
            iterTree(fn, this.trees[i])
        }
    }

    map(fn) {
        let bf = new BForest()

        for (let i = 0; i < this.trees.length; i++) {
            bf.trees.push(mapTree(fn, this.trees[i]))
        }

        return bf
    }

    tail() {
        if (this.isEmpty()) {
            return this
        }

        let bf = new BForest()
        if (this.trees[0].size > 1) { // Need to break apart first tree
            let ptr = this.trees[0]

            while (ptr !== null && ptr.right !== null) {
                bf.trees.push(ptr.right) // Collect the trees on the right
                ptr = ptr.left // Recurse down the left side of the tree
            }

            bf.trees.reverse() // Last tree pushed on is the smallest/'first'
        }

        bf.trees = bf.trees.concat(this.trees.slice(1)) // Keep old trees
        return bf
    }

    index(index) {
        if (this.isEmpty() || !Number.isInteger(index) || index < 0) {
            return null
        }

        for (let i = 0; i < this.trees.length; i++) {
            if (index < this.trees[i].size) { // It's in this tree
                let ptr = this.trees[i]
                while (ptr.left !== null) {
                    if (index < ptr.left.size) { // 0 <= index < 2^n
                        ptr = ptr.left // [0..2^n] -> [0..2^(n-1)]
                    } else {
                        index -= ptr.left.size // [0..2^n] -> [2^(n-1)..2^n] - 2^(n-1)
                        ptr = ptr.right
                    }
                }
                return ptr.value // We must be at the leaf [i] if ptr.left is null
            } else { // It's in a later tree, subtract from index # skipped
                index -= this.trees[i].size
            }
        }
        return null // We looked at all the trees and didn't find [i]
    }

    update(index, value) {
        if (this.isEmpty()) { return null }

        for (let i = 0; i < this.trees.length; i++) {
            if (index >= this.trees[i].size) { // It's in a later tree
                index -= this.trees[i].size // Subtract from index # skipped
                continue
            }

            let bf = new BForest()
            bf.trees = this.trees.slice(0, i) // Collect all trees before
            bf.trees.push(updateTree(this.trees[i], index, value))
            bf.trees = bf.trees.concat(this.trees.slice(i + 1)) // And after
            return bf
        }
        return this // Updated nothing! Return the original tree
    }

    toString() {
        let strings = []
        this.iter(function(elt) { strings.push(elt.toString()) })
        return '[' + strings.join(', ') + ']'
    }
}

module.exports = BForest
