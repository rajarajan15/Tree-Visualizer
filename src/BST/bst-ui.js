export const defaultBSTUIConfig = {
  HIGHLIGHT_CLASS: 'node__element--highlight',
  HIGHLIGHT_TIME: 300,
};


class BinarySearchTreeUI {
  highlightTimer = null;
  actionsContainerSelector;
  constructor(
    tree,
    render,
    treeContainerSelector = '.tree',
    actionsContainerSelector = '.bst-actions-container',
    config = {
      HIGHLIGHT_CLASS: 'node__element--highlight',
      HIGHLIGHT_TIME: 800,
    }
  ) {
    this.treeContainerSelector = treeContainerSelector;
    this.actionsContainerSelector = actionsContainerSelector;
    this.config = config;
    this.tree = tree;
    this.render = render || this.renderTree;
    const root = document.documentElement;
    root.style.setProperty(
      '--animation-timing',
      `${this.config.HIGHLIGHT_TIME / 1000}s`
    );
  }

  template() {
    return `
    <div class="btn-group" >
      <button id="insertBtn" class="bluebutton btn">
        Insert Node
      </button>
      <button id="removeElementBtn" class="pinkbutton btn" >
        Remove Node
      </button>
    </div>
    <div class="btn-group">
      <button id="searchBtn" class="bluebutton btn">Search</button>
      <button id="minValueBtn" class="pinkbutton btn" >
        Min Value
      </button>
      <button id="maxValueBtn" class="greenbutton btn" >Max Value</button>
    </div>
    <div class="btn-group">
      <button id="inOrderTravBtn" class="bluebutton btn" >
        In Order Traversal
      </button>
      <button id="postOrderTravBtn" class="pinkbutton btn">
        Post Order Traversal
      </button>
      <button id="preOrderTravBtn" class="greenbutton btn" >
        Pre Order Traversal
      </button>
    </div>
    <div class="btn-group">
      <button id="resetBtn" class="redbutton btn">
        Delete Tree
      </button>
    </div>
    <div class="btn-group">
        <button id="switchTravBtn" hidden="true" class="greenbutton btn" >
          Hide Traversal Preview
        </button>
      </div>
    `;
  }

  traverseUINodes(nodes) {
    nodes.reduce((pr, node) => {
      return pr.then(() => this.highlightNodetrav(node));
    }, Promise.resolve());
  }

  highlightNodetrav({ value }) {
    const nodeElement = document.querySelector(`[data-node-id="${value}"]`);
    
    if (this.highlightTimer !== null) {
      clearTimeout(this.highlightTimer);
      this.displayValue(null); // Clear the displayed value
      nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
      this.highlightTimer = null;
      return;
    }
  
    this.displayValue(value);
  
    nodeElement.classList.add(this.config.HIGHLIGHT_CLASS);

    this.disableAllBtns();
  
    return new Promise((resolve) => {
      this.highlightTimer = setTimeout(() => {
        this.displayValue(null);
        nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
        this.highlightTimer = null;
        resolve();
      }, this.config.HIGHLIGHT_TIME);
    });
  }


  getTreeUI(node) {
    const { left, right, value } = node;
    if (!node) {
      return '';
    }
    return `
      <div class="node__element" data-node-id="${value}">${value}</div>
      ${
        left || right
          ? `
            <div class="node__bottom-line"></div>
            <div class="node__children">
            <div class="node node--left">
              ${left ? this.getTreeUI(left) : ''}
            </div>
            <div class="node node--right">
              ${right ? this.getTreeUI(right) : ''}
            </div>
            </div>
          `
          : ''
      }
    `;
  } 

  renderTree(
    node = this.tree.root,
    containerSelector = this.treeContainerSelector
  ) {
    const treeContainer = document.querySelector(containerSelector);
    if (!node) {
      return (treeContainer.innerHTML = '');
    }
    const template = this.getTreeUI(node);
    treeContainer.innerHTML = template;
  }

  highlightNode({ value }) {
    const nodeElement = document.querySelector(`[data-node-id="${value}"]`);
    
    if (this.highlightTimer !== null) {
      clearTimeout(this.highlightTimer);
      this.displayValue(null); // Clear the displayed value
      nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
      this.highlightTimer = null;
      return;
    }
  
  
    nodeElement.classList.add(this.config.HIGHLIGHT_CLASS);
    document.querySelectorAll('button').forEach((btn) => {
      btn.setAttribute('disabled', true);
    });
  
    return new Promise((resolve) => {
      this.highlightTimer = setTimeout(() => {
        this.displayValue(null); 
        nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
        document.querySelectorAll('button').forEach((btn) => {
          btn.removeAttribute('disabled');
        });
        this.highlightTimer = null;
        resolve();
      }, this.config.HIGHLIGHT_TIME);
    });
  }
  hideTravPreview() {
    const selector = '#display-container-id';
    const treeContainer = document.querySelector(selector);
    treeContainer.innerHTML = '';
  }

  resetTravView() {
    const toggleBalancePreviewBtn = document.querySelector('#switchTravBtn');
    this.hideTravPreview();
    toggleBalancePreviewBtn.setAttribute('hidden', true);
    document.querySelectorAll('button').forEach((btn) => {
      btn.removeAttribute('disabled');
    });
  }

disableAllBtns() {
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach((btn) => {
    if (btn.getAttribute('id') === 'switchTravBtn') {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('disabled', true);
    }
  });
}

displayValue(value) {
  const displayContainer = document.getElementById('display-container-id');
  if (displayContainer) {
    if (value !== null) {
      displayContainer.style.display = 'flex';
      const valueElement = document.createElement('span');
      valueElement.textContent = `${value}`;

      const previousNode = displayContainer.querySelector('span:last-child');
      if (previousNode) {
        const arrowTextNode = document.createTextNode(' -> ');
        displayContainer.appendChild(arrowTextNode);
      }

      displayContainer.appendChild(valueElement);
    }
  }
}


  onRemoveElementBtnClick() {
    const element = prompt('Enter element to remove from the tree');
    if(!element)
    {
      return;
    }
    if (!/^\d+(\.\d+)?$/.test(element)) {
      alert('Please enter a valid integer or float.');
      return;
    }
    const elementExists = this.tree.search(element);
    if (!elementExists) {
      alert(`${element} is not present in the tree.`);
      return;
    }
    const removedEl = this.tree.remove(element);
    if (removedEl) {
      this.highlightNode(removedEl).then(() => {
        this.render(this.tree.root);
      });
    }
  }
  

  setTemplate() {
    const actionsContainer = document.querySelector(
      this.actionsContainerSelector
    );
    actionsContainer.innerHTML = this.template();
  }

  onInsertClick() {
    const element = prompt('Enter element to insert into the tree');
  
    if (!element) {
      return;
    }
  
    if (!/^\d+(\.\d+)?$/.test(element)) {
      alert('Please enter a valid integer or float.');
      return;
    }
  
    if (this.tree.search(element)) {
      alert(`${element} is already present in the tree.`);
      return;
    }
  
    const node = this.tree.insert(element);
    this.render(this.tree.root);
    this.highlightNode(node);
  }
  

  onMinValueBtnClick() {
    const node = this.tree.minimum();
    if (node) {
      this.highlightNode(node);
    } else {
      alert('Node not found');
    }
  }

  onSearchBtnClick() {
    const searchVal = prompt('Enter the node value to search in the tree');
    if(!searchVal)
    {
      return;
    }
    if (!/^\d+(\.\d+)?$/.test(searchVal)) {
      alert('Please enter a valid integer or float.');
      return;
    }

    const searchedNode = this.tree.search(searchVal);
    if (searchedNode) {
      this.highlightNode(searchedNode);
    } else {
      alert('Node not found');
    }
  }

  onMaxValueBtnClick() {
    const node = this.tree.max();
    if (node) {
      this.highlightNode(node);
    } else {
      alert('Node not found');
    }
  }

  onPreOrderTravBtnClick() {
    const result = this.tree.preOrderTraverse();
    this.traverseUINodes(result);
  }
  
  onInOrderTravBtnClick() {
    const result = this.tree.inOrderTraverse();
    this.traverseUINodes(result);
  }
  
  onPostOrderTravBtnClick() {
    const result = this.tree.postOrderTraverse();
    this.traverseUINodes(result);
  }
  
  onResetBtnClick() {
    if(!this.tree.root)
    {
      alert("Create a tree to delete");
      return;
    }
    this.highlightNode(this.tree.root).then(() => {
      this.tree.root = null;
      this.render(this.tree.root);
    });
  }

  init() {
    this.setTemplate();
    const insert = document.querySelector('#insertBtn');
    const removeElementBtn = document.querySelector('#removeElementBtn');
    const minValueBtn = document.querySelector('#minValueBtn');
    const maxValueBtn = document.querySelector('#maxValueBtn');
    const searchBtn = document.querySelector('#searchBtn');
    const preOrderTravBtn = document.querySelector('#preOrderTravBtn');
    const inOrderTravBtn = document.querySelector('#inOrderTravBtn');
    const postOrderTravBtn = document.querySelector('#postOrderTravBtn');
    const resetBtn = document.querySelector('#resetBtn');
    const toggleTravPreviewBtn = document.querySelector('#switchTravBtn');
    removeElementBtn.addEventListener('click',this.onRemoveElementBtnClick.bind(this));
    insert.addEventListener('click', this.onInsertClick.bind(this));
    minValueBtn.addEventListener('click', this.onMinValueBtnClick.bind(this));
    searchBtn.addEventListener('click', this.onSearchBtnClick.bind(this));
    maxValueBtn.addEventListener('click', this.onMaxValueBtnClick.bind(this));
    preOrderTravBtn.addEventListener(
      'click',
      this.onPreOrderTravBtnClick.bind(this)
    );
    inOrderTravBtn.addEventListener(
      'click',
      this.onInOrderTravBtnClick.bind(this)
    );
    postOrderTravBtn.addEventListener(
      'click',
      this.onPostOrderTravBtnClick.bind(this)
    );
    resetBtn.addEventListener('click', this.onResetBtnClick.bind(this));
    toggleTravPreviewBtn.addEventListener('click',this.resetTravView.bind(this));
    
  }
}

export default BinarySearchTreeUI;
