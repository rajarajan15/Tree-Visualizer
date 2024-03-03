// MaxHeapMain.js
import React, { useEffect } from 'react';
import MinHeapUI from './HEAP/minheap/minheapui';
import MinHeap from './HEAP/minheap/minheap';
const MinHeapMain = () => {
  useEffect(() => {
    const main = () => {
      // Assuming you have a MaxHeap instance
      const minHeap = new MinHeap();
      // Initialize MaxHeapUI with your MaxHeap instance
      const minHeapUI = new MinHeapUI(minHeap);
      minHeapUI.init(); // Initialize UI interactions
      minHeapUI.render(); // Render initial state of the max heap

      // Optional: Add more logic to interact with the MaxHeap or MaxHeapUI
    };

    main();
  }, []);

  return (
    <div className='tree'>
      {/* Add any additional components or content related to your app */}
    </div>
  );
};

export default MinHeapMain;
