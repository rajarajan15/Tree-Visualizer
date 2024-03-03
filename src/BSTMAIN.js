import React, { useEffect } from 'react';
import './styles/globals.css';
import './styles/tree.css';
import './BST/js_binary_search_tree.css';
import BinarySearchTree from './BST/js_binary_search_tree';
import BinarySearchTreeUI from './BST/bst-ui';
// import createSampleTreeData from './BST/create-sample-tree-data';

const BSTMAIN = () => {
  useEffect(() => {
    const main = () => {
      const myTree = new BinarySearchTree();
      // createSampleTreeData(myTree);
      // console.log('treeData', myTree);
      const bstUI = new BinarySearchTreeUI(myTree, null, '.tree');
      bstUI.init();
      bstUI.render();
    };

    main();
  }, []);

  return (
    <div className="tree">
      {/* Add any additional components or content related to your app */}
    </div>
  );
};

export default BSTMAIN;
