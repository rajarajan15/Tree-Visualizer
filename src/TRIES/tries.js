class TrieNode {
    constructor() {
        this.children = {};
        this.isEndofword = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {

        let currentnode = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!currentnode.children[char]) {
                currentnode.children[char] = new TrieNode();
            }
            currentnode = currentnode.children[char];
        }
        currentnode.isEndofword = true;
    }

    search(word) {
        let currentnode = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!currentnode.children[char]) {
                return false;
            }
            currentnode = currentnode.children[char];
        }
        return currentnode.isEndofword;
    }

    delete(word) {
        if (!this.search(word)) {
            return;
        }
        let currentnode = this.root;
        let stack = [];
    
        for (let i = 0; i < word.length; i++) {
            stack.push({ node: currentnode, char: word[i] });
            currentnode = currentnode.children[word[i]];
        }
        currentnode.isEndofword = false;
        while (stack.length > 0 && !currentnode.isEndofword && Object.keys(currentnode.children).length === 0) {
            let { node, char } = stack.pop();
            delete node.children[char];
            currentnode = node;
        }
    
    }
    
    deleteTrie(node = this.root) {
        if (!node) {
            return;
        }
    
        for (let char in node.children) {
            this.deleteTrie(node.children[char]);
        }
    
        node.children = {};
    }
    
}

class TrieRenderer {
    constructor(trieInstance) {
        this.trie = trieInstance;
        this.actionsContainerSelector = '.trie-actions-container';
        this.trieContainerSelector = '#trie-container';
        this.root = trieInstance.root;
    }
    
    template() {
        return `
        <div class="btn-group">
          <button id="inserttrie" class="bluebutton btn">
            Insert Word
          </button>
          <button id="removetrie" class="greenbutton btn">
            Remove Word
          </button>
        </div>
        <div class="btn-group">
          <button id="deletetrie" class="btn btn-danger">
            Delete Tree
          </button>
        </div>
        `;
    }

    setTemplate() {
        const actionsContainer = document.querySelector(this.actionsContainerSelector);
        actionsContainer.innerHTML = this.template();
    }

    init() {
        this.setTemplate();
        const insert = document.querySelector('#inserttrie');
        const remove = document.querySelector('#removetrie');
        const delBtn = document.querySelector('#deletetrie');
        insert.addEventListener('click', this.onInsertTrieClick.bind(this));
        remove.addEventListener('click', this.onRemoveTrieClick.bind(this));
        delBtn.addEventListener('click', this.onDeleteTrieClick.bind(this));
    }

    onInsertTrieClick = async () => {
        const element = await this.promptAsync('Enter word to insert into the trie');
        if (!element) {
          return;
        }
      
        if (!/^[a-zA-Z]+$/.test(element)) {
          alert('Please enter a valid string without any numbers or special characters.');
          return;
        }
      
        if (this.trie.search(element)) {
          alert(`${element} is already present in the trie.`);
          return;
        } else {
          this.trie.insert(element);
          this.renderTrie();
        }
      };
      
      onRemoveTrieClick = async () => {
        const element = await this.promptAsync('Enter word to delete from the trie');
        if (!element) {
          return;
        }
      
        if (!/^[a-zA-Z]+$/.test(element)) {
          alert('Please enter a valid string without any numbers or special characters.');
          return;
        }
      
        if (!this.trie.search(element)) {
          alert(`${element} is not present in the trie.`);
          return;
        } else {
          this.trie.delete(element);
          this.renderTrie();
        }
      };
      

    onDeleteTrieClick = () => {
        this.trie.deleteTrie();
        this.renderTrie();
    };
    
    promptAsync = (promptMessage) => {
        return new Promise(resolve => {
            const userInput = prompt(promptMessage);
            resolve(userInput);
        });
    };

    renderTrie = () => {
        const trieContainer = document.querySelector(this.trieContainerSelector);
        trieContainer.innerHTML = this.getTrieUI(this.root);
    
        const nodes = trieContainer.querySelectorAll('.node__element');
        let previousParentId = null;
    
        nodes.forEach((node) => {
            const parentId = node.getAttribute('data-parent-id');
    
            if (parentId && parentId !== previousParentId) {
                const lineBreak = document.createElement('br');
                node.insertAdjacentElement('beforebegin', lineBreak);
                previousParentId = parentId;
            }
        });
    };

    getTrieUI = (node, value = '') => {
        if (!node) {
            return '';
        }
    
        const { children, isEndofword } = node;
        const nodeClass = isEndofword ? 'node__element node__element--end' : 'node__element';
        const endText = isEndofword ? `<div class="end-text">end of word</div>` : '';
    
        let childrenUI = '';
        for (const char in children) {
            if (children.hasOwnProperty(char)) {
                const childNode = children[char];
                childrenUI += this.getTrieUI(childNode, char);
            }
        }
    
        return `
            <div class="node__container node">
                <div class="node-wrapper node">
                <div class="${nodeClass}" data-node-id="${value}">
                    ${value}
                </div>
                ${endText}
                </div>
                ${
                    childrenUI
                        ? `
                        <div class="node__bottom-line"></div>
                        <div class="node__children">
                            ${childrenUI}
                        </div>
                        `
                        : ''
                }
            </div>
        `;
    };
    
    
}

export { Trie, TrieRenderer };

