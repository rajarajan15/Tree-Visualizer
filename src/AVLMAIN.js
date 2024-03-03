import React, { useEffect } from 'react';
import './styles/globals.css';
import './styles/tree.css';
import './BST/js_binary_search_tree.css';
import './AVL/js_avl_tree.css';
import AVLTree from './AVL/js_avl_tree';
import AVLTreeUI from './AVL/avl_tree_ui';


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

  return (
    <div>
      {/*  */}
    </div>
  );
};

export default AVL;
