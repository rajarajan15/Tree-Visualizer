export const defaultMinHeapUIConfig = {
    HIGHLIGHT_CLASS: 'node__element--highlight',
    HIGHLIGHT_TIME: 300,
  };
  
  class MinHeapUI {
    highlightTimer = null;
    actionsContainerSelector;
  
    constructor(
      heap,
      render,
      heapContainerSelector = '.minheap',
      actionsContainerSelector = '.min-heap-actions-container',
      config = {
        HIGHLIGHT_CLASS: 'node__element--highlight',
        HIGHLIGHT_TIME: 800,
      }
    ) {
      this.heapContainerSelector = heapContainerSelector;
      this.actionsContainerSelector = actionsContainerSelector;
      this.config = config;
      this.heap = heap;
      this.render = render || this.renderHeap;
      const root = document.documentElement;
      root.style.setProperty(
        '--animation-timing',
        `${this.config.HIGHLIGHT_TIME / 1000}s`
      );
    }
  
    template() {
      return `
        <div class="btn-group">
          <button id="heapinsert" class="bluebutton btn">
            Insert Element
          </button>
          <button id="extractMinBtn" class="greenbutton btn">
            Extract Min
          </button>
        </div>
        <div class="btn-group">
          <button id="peekBtn" class="pinkbutton btn">Peek</button>
        </div>
        <div class="btn-group">
          <button id="minresetBtn" class="redbutton btn">
            Delete Heap
          </button>
        </div>
      `;
    }
  
    getHeapUI(index = 0) {
      const { items } = this.heap;
  
      if (index >= items.length) {
        return '';
      }
  
      const currentValue = items[index];
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
  
      const leftChildUI = this.getHeapUI(leftChildIndex);
      const rightChildUI = this.getHeapUI(rightChildIndex);
  
      const nodeHTML = `
        <div class="node__element heap-node" data-index="${index}">
          ${currentValue}
        </div>
        ${
            leftChildUI || rightChildUI 
            ?`
              <div class="node__bottom-line"></div>
              <div class="node__children">` 
              
            : ''}
        <div class="node node--left heap-children">    
          ${leftChildUI}
        </div>
        <div class="node node--right">
          ${rightChildUI}
        </div>
        ${leftChildUI || rightChildUI ? '</div>' : ''}
      `;
  
      return nodeHTML;
    }
  
    renderHeap(containerSelector = this.heapContainerSelector) {

      const heapContainer = document.querySelector(containerSelector);
      if (!heapContainer) return; 
  
      heapContainer.innerHTML = this.getHeapUI();
    }
  
    highlightNode(index) {
      const nodeElement = document.querySelector(`[data-index="${index}"]`);
  
      if (this.highlightTimer !== null) {
        clearTimeout(this.highlightTimer);
        nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
        this.highlightTimer = null;
        return;
      }
  
      nodeElement.classList.add(this.config.HIGHLIGHT_CLASS);
  
      return new Promise((resolve) => {
        this.highlightTimer = setTimeout(() => {
          nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
          this.highlightTimer = null;
          resolve();
        }, this.config.HIGHLIGHT_TIME);
      });
    }
  
    onInsertClick() {
      const element = prompt('Enter element to insert into the heap');
      if (!element) {
        return;
      }
      if (!/^\d+(\.\d+)?$/.test(element)) {
        alert('Please enter a valid integer or float.');
        return;
      }
      this.heap.insert(parseInt(element));

      this.render();
    }
  
    onExtractMinBtnClick() {
      const min = this.heap.extractMin();
      if (min !== null) {
        this.render();
      } else {
        alert('Heap is empty');
      }
    }
  
    onPeekBtnClick() {
      const min = this.heap.peek();
      if (min !== null) {
        this.highlightNode(0);
      } else {
        alert('Heap is empty');
      }
    }
  
    onResetBtnClick() {
      this.heap.items = [];
      this.render();
    }
  
    setTemplate() {
      const actionsContainer = document.querySelector(
        this.actionsContainerSelector
      );
      actionsContainer.innerHTML = this.template();
    }
  
    init() {
      this.setTemplate();
      const insertbutton = document.querySelector('#heapinsert');
      const extractMinBtn = document.querySelector('#extractMinBtn');
      const peekBtn = document.querySelector('#peekBtn');
      const resetBtn = document.querySelector('#minresetBtn');
  
      insertbutton.addEventListener('click', this.onInsertClick.bind(this));
      extractMinBtn.addEventListener(
        'click',
        this.onExtractMinBtnClick.bind(this)
      );
      peekBtn.addEventListener('click', this.onPeekBtnClick.bind(this));
      resetBtn.addEventListener('click', this.onResetBtnClick.bind(this));
    }
  }
  
  export default MinHeapUI;
  