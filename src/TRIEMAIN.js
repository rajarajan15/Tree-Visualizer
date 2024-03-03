// App.js
import React, { useEffect } from 'react';
import {Trie,TrieRenderer } from  './TRIES/tries';


const TrieMain = () => {
  useEffect(() => {
    const main = () => {
      const myTrie = new Trie();
      const trieRenderer = new TrieRenderer(myTrie);
      trieRenderer.init(); // Assuming you have initialization logic in TrieRenderer
      trieRenderer.renderTrie();

      // Use trieRenderer.onInsertTrieClick if it's the insertion method
      // trieRenderer.onInsertTrieClick(); 

      // Optional: Add more logic to interact with the Trie or TrieRenderer
      console.log('trieData', myTrie);
    };

    main();
  }, []);

  return (
    <div id="trie-container">
      {/* Add any additional components or content related to your app */}
    </div>
  );
};

export default TrieMain;
