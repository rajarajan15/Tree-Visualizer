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
  
  class MaxHeap {
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
        if (this.compareFn(this.items[parentIndex], this.items[index]) === COMPARISON.SMALLER) {
          this.swap(parentIndex, index);
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    extractMax() {
      if (this.items.length === 0) {
        return null;
      }
      if (this.items.length === 1) {
        return this.items.pop();
      }
      const max = this.items[0];
      this.items[0] = this.items.pop();
      this.sinkDown(0);
      return max;
    }
  
    sinkDown(index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let maxIndex = index;
  
      if (leftChildIndex < this.items.length && this.compareFn(this.items[leftChildIndex], this.items[maxIndex]) === COMPARISON.GREATER) {
        maxIndex = leftChildIndex;
      }
      if (rightChildIndex < this.items.length && this.compareFn(this.items[rightChildIndex], this.items[maxIndex]) === COMPARISON.GREATER) {
        maxIndex = rightChildIndex;
      }
  
      if (maxIndex !== index) {
        this.swap(index, maxIndex);
        this.sinkDown(maxIndex);
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
  
  export default MaxHeap;
  