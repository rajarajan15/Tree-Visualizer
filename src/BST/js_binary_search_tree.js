const COMPARISON = {
  EQUAL: 0,
  SMALLER: -1,
  GREATER: 1,
};

const defaultCompareNumberFn = (a, b) => {
  if (Number(a) === Number(b)) {
    return COMPARISON.EQUAL;
  }

  return Number(a) < Number(b) ? COMPARISON.SMALLER : COMPARISON.GREATER;
};

class TreeNode {
  constructor(value, parent) {
    this.value = value.toString();
    this.parent = parent || null;
    this.left = null;
    this.right = null;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}
class BinarySearchTree {
  root;
  compareFn;

  constructor(compareFn = defaultCompareNumberFn) {
    this.root = null;
    this.compareFn = compareFn;
  }

  insert(value) {
    let node = this.root;
    let insertedNode;
    if (node === null) {
      this.root = new TreeNode(value);
      return this.root;
    }
    const nodeInserted = (() => {
      while (true) {
        const comparison = this.compareFn(value, node.value);
        if (comparison === COMPARISON.EQUAL) {
          insertedNode = node;
          return node;
        }
        if (comparison === COMPARISON.SMALLER) {
          if (node.left === null) {
            insertedNode = new TreeNode(value, node);
            node.left = insertedNode;
            return true;
          }
          node = node.left;
        } else if (comparison === COMPARISON.GREATER) {
          if (node.right === null) {
            insertedNode = new TreeNode(value, node);
            node.right = insertedNode;
            return true;
          }
          node = node.right;
        }
      }
    })();
    if (nodeInserted) {
      return insertedNode;
    }
  }

  remove(value, node) {
    node = node ? node : this.search(value);
    if (!node) return null;
  
    const isRoot = node.parent === null;
    const isLeftChild = !isRoot ? node.parent.left === node : false;
  
    if (node.left === null && node.right === null) {
      // Case: Node is a leaf
      if (isRoot) {
        this.root = null;
      } else if (isLeftChild) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      return node;
    }
  
    if (node.left === null || node.right === null) {
      // Case: Node has one child
      const child = node.left !== null ? node.left : node.right;
      if (isRoot) {
        this.root = child;
      } else if (isLeftChild) {
        node.parent.left = child;
      } else {
        node.parent.right = child;
      }
      if (child) {
        child.parent = node.parent;
      }
      return node;
    }
  
    // Case: Node has both left and right children
    const minRightLeaf = this.min(node.right);

    const clone = { ...node };
    node.value = minRightLeaf.value;
    this.remove(minRightLeaf.value);

    return clone;
  }
  
  
  search(value) {
    return this.postOrderTraverse().find((node) => node.value === value);
  }
  
  
  min(node) {
    while (node.left!==null) {
      node = node.left;
    }
    return node;
  }

  minimum(node = this.root) {
    let current = node;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  max(node = this.root) {
    let current = node;
    while (current !== null && current.right !== null) {
      current = current.right;
    }
    return current;
  }
  inOrderTraverse(node = this.root, traversed = []) {
    if (node === null) {
      return traversed;
    }
    if (node.left) {
      traversed.push(...this.inOrderTraverse(node.left));
    }
    traversed.push(node);
    if (node.right) {
      traversed.push(...this.inOrderTraverse(node.right));
    }
    return traversed;
  }
  
  preOrderTraverse(node = this.root, traversed = []) {
    if (node === null) {
      return traversed;
    }
    traversed.push(node);
    if (node.left) {
      traversed.push(...this.preOrderTraverse(node.left));
    }
    if (node.right) {
      traversed.push(...this.preOrderTraverse(node.right));
    }
    return traversed;
  }
  
  postOrderTraverse(node = this.root, traversed = []) {
    if (node === null) {
      return traversed;
    }
    if (node.left) {
      traversed.push(...this.postOrderTraverse(node.left));
    }
    if (node.right) {
      traversed.push(...this.postOrderTraverse(node.right));
    }
    traversed.push(node);
    return traversed;
  }
}  

export default BinarySearchTree;
