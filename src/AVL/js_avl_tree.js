import BinarySearchTree from '../BST/js_binary_search_tree.js'
const BALANCE_FACTORS = {
  LEFT_HEAVY: -1,
  BALANCED: 0,
  RIGHT_HEAVY: 1,
};
class AVLTree extends BinarySearchTree {
  getNodeHeight(node) {
    if (node === null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  getBalanceFactor(node) {
    if (node === null) {
      return 0;
    }
    return this.getNodeHeight(node.right) - this.getNodeHeight(node.left);
  }

  rotateRight(node) {
    const left = node.left;
    node.left = left.right;
    left.right = node;

    left.parent = node.parent;
    node.parent = left;
    if (left.parent) {
      if (left.parent.left === node) {
        left.parent.left = left;
      } else {
        left.parent.right = left;
      }
    }
    return left;
  }

  rotateLeft(node) {
    const right = node.right;
    node.right = right.left;
    right.left = node;

    right.parent = node.parent;
    node.parent = right;
    if (right.parent) {
      if (right.parent.left === node) {
        right.parent.left = right;
      } else {
        right.parent.right = right;
      }
    }
    return right;
  }

  rotateLeftRight(node) {
    node.left = this.rotateLeft(node.left);
    return this.rotateRight(node);
  }

  rotateRightLeft(node) {
    node.right = this.rotateRight(node.right);
    return this.rotateLeft(node);
  }

  rebalance(node) {

    if (!node) {
        return;
    }

    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor < BALANCE_FACTORS.LEFT_HEAVY) {
        // -2
        if (this.getBalanceFactor(node.left) === BALANCE_FACTORS.LEFT_HEAVY) {
            node = this.rotateRight(node);
        } else {
            node = this.rotateLeftRight(node);
        }
    } else if (balanceFactor > BALANCE_FACTORS.RIGHT_HEAVY) {
        // +2
        if (this.getBalanceFactor(node.right) === BALANCE_FACTORS.RIGHT_HEAVY) {
            node = this.rotateLeft(node);
        } else {
            node = this.rotateRightLeft(node);
        }
    }

    if (node && node.parent) {
        this.rebalance(node.parent);
    } else if (node) {
        this.root = node;
    }
}


  remove(value) {
    const removedNode = super.remove(value);

    // If the removed node was the root, update the root
    if (removedNode === this.root) {
        this.root = removedNode ? removedNode.parent : null;
    }

    // Rebalance the tree
    if (removedNode) {
        this.rebalance(removedNode.parent);
    }

    return removedNode;
}



  insert(value) {
    const node = super.insert(value);
    this.rebalance(node);
    return node;
  }
}
export default AVLTree;
