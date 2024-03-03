import React, { useEffect } from 'react';
import MaxHeapUI from './HEAP/maxheap/maxheapui';
import MaxHeap from './HEAP/maxheap/maxheap';
const MaxHeapMain = () => {
  useEffect(() => {
    const main = () => {
      const maxHeap = new MaxHeap();
      const maxHeapUI = new MaxHeapUI(maxHeap);
      maxHeapUI.init(); 
      maxHeapUI.render(); 

    };

    main();
  }, []);

  return (
    <div className='tree'>
      {/*  */}
    </div>
  );
};

export default MaxHeapMain;
