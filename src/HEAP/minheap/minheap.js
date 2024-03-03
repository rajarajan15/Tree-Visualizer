const COMPARISON = {
    EQUAL: 0,
    SMALLER: -1,
    GREATER: 1,
  };
  
  const defaultCompareNumberFn = (a, b) => {
    if (Number(a) === Number(b)) {
      return COMPARISON.EQUAL;
    }
  
    return Number(a) < Number(b) ? COMPARISON.SMALLER : COMPARISON.GREATER;
  };
  
  class MinHeap {
    items = [];
    compareFn;
  
    constructor(compareFn = defaultCompareNumberFn) {
      this.items = [];
      this.compareFn = compareFn;
    }
  
    insert(value) {
      this.items.push(value);
      this.bubbleUp(this.items.length - 1);
    }
  
    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.compareFn(this.items[parentIndex], this.items[index]) === COMPARISON.GREATER) {
          this.swap(parentIndex, index);
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    extractMin() {
      if (this.items.length === 0) {
        return null;
      }
      if (this.items.length === 1) {
        return this.items.pop();
      }
      const min = this.items[0];
      this.items[0] = this.items.pop();
      this.sinkDown(0);
      return min;
    }
  
    sinkDown(index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let minIndex = index;
  
      if (leftChildIndex < this.items.length && this.compareFn(this.items[leftChildIndex], this.items[minIndex]) === COMPARISON.SMALLER) {
        minIndex = leftChildIndex;
      }
      if (rightChildIndex < this.items.length && this.compareFn(this.items[rightChildIndex], this.items[minIndex]) === COMPARISON.SMALLER) {
        minIndex = rightChildIndex;
      }
  
      if (minIndex !== index) {
        this.swap(index, minIndex);
        this.sinkDown(minIndex);
      }
    }
  
    swap(index1, index2) {
      [this.items[index1], this.items[index2]] = [this.items[index2], this.items[index1]];
    }
  
    peek() {
      return this.items.length > 0 ? this.items[0] : null;
    }
  
    size() {
      return this.items.length;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  export default MinHeap;
  