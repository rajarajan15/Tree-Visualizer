import React, { useEffect } from 'react';
import MinHeapUI from './HEAP/minheap/minheapui';
import MinHeap from './HEAP/minheap/minheap';
const MinHeapMain = () => {
  useEffect(() => {
    const main = () => {
      const minHeap = new MinHeap();
      const minHeapUI = new MinHeapUI(minHeap);
      minHeapUI.init(); 
      minHeapUI.render();

    };
    main();
  }, []);

  return (
    <div className='tree'>
      {/*  */}
    </div>
  );
};

export default MinHeapMain;
