import React, { useEffect } from 'react';
import {Trie,TrieRenderer } from  './TRIES/tries';


const TrieMain = () => {
  useEffect(() => {
    const main = () => {
      const myTrie = new Trie();
      const trieRenderer = new TrieRenderer(myTrie);
      trieRenderer.init();
      trieRenderer.renderTrie();
    };

    main();
  }, []);

  return (
    <div id="trie-container">
      {/*  */}
    </div>
  );
};

export default TrieMain;
