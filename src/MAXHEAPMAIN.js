// MaxHeapMain.js
import React, { useEffect } from 'react';
import MaxHeapUI from './HEAP/maxheap/maxheapui';
import MaxHeap from './HEAP/maxheap/maxheap';
const MaxHeapMain = () => {
  useEffect(() => {
    const main = () => {
      // Assuming you have a MaxHeap instance
      const maxHeap = new MaxHeap();
      // Initialize MaxHeapUI with your MaxHeap instance
      const maxHeapUI = new MaxHeapUI(maxHeap);
      maxHeapUI.init(); // Initialize UI interactions
      maxHeapUI.render(); // Render initial state of the max heap

      // Optional: Add more logic to interact with the MaxHeap or MaxHeapUI
      console.log('maxHeapData', maxHeap);
    };

    main();
  }, []);

  return (
    <div className='tree'>
      {/* Add any additional components or content related to your app */}
    </div>
  );
};

export default MaxHeapMain;
