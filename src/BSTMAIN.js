import React, { useEffect } from 'react';
import './styles/globals.css';
import './styles/tree.css';
import './BST/js_binary_search_tree.css';
import BinarySearchTree from './BST/js_binary_search_tree';
import BinarySearchTreeUI from './BST/bst-ui';

const BSTMAIN = () => {
  useEffect(() => {
    const main = () => {
      const myTree = new BinarySearchTree();

      const bstUI = new BinarySearchTreeUI(myTree, null, '.tree');
      bstUI.init();
      bstUI.render();
    };

    main();
  }, []);

  return (
    <div className="tree">
      {/*  */}
    </div>
  );
};

export default BSTMAIN;
