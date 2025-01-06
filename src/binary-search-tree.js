const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.root_node = null;
  }
  root() {
    return this.root_node;
  }

  add(data) {
    const new_node = new Node(data);

    if (!this.root_node) {
      this.root_node = new_node;
      return;
    }

    let current = this.root_node;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = new_node;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new_node;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this.root_node;
    while (current) {
      if (data === current.data) {
        return !!current;
      }
      current = data < current.data ? current.left : current.right;
    }
    return !!null;
  }

  find(data) {
    let current = this.root_node;
    while (current) {
      if (data === current.data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    this.root_node = this.rec_remove(this.root_node, data);
  }

  min() {
    if (!this.root_node) return null;
    let current = this.root_node;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.root_node) return null;
    let current = this.root_node;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }

  rec_remove(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.rec_remove(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.rec_remove(node.right, data);
      return node;
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minNode = this.min_from_node(node.right);
      node.data = minNode.data;
      node.right = this.rec_remove(node.right, minNode.data);
      return node;
    }
  }

  min_from_node(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree,
};
