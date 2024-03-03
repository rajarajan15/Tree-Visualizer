import React, { useEffect } from 'react';
import './styles/globals.css';
import './styles/tree.css';
import './BST/js_binary_search_tree.css';
import './AVL/js_avl_tree.css';
import AVLTree from './AVL/js_avl_tree';
import AVLTreeUI from './AVL/avl_tree_ui';
// import createSampleTreeData from './BST/create-sample-tree-data';


const AVL = () => {
  useEffect(() => {
    const main = () => {
      const avlTree =new AVLTree();
      const avlUI = new AVLTreeUI(avlTree);
      avlUI.init();
      avlUI.render();
      window.avlTree = avlTree;
    };

    main();
  }, []);
  // const sampleData = () => {
  //   const tree = new AVLTree();
  //   createSampleTreeData(tree);
  //   return tree;
  // };

  return (
    <div>
      {/* Add JSX for rendering components if needed */}
    </div>
  );
};

export default AVL;
