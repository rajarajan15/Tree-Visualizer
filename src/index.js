import React from 'react';
import ReactDOM from 'react-dom/client';
import AVL from './AVLMAIN';
import reportWebVitals from './reportWebVitals';
import BSTMAIN from './BSTMAIN';
import TrieMain from './TRIEMAIN';
import MaxHeapMain from './MAXHEAPMAIN';
import MinHeapMain from './MINHEAPMAIN';
import Homepage from './HOME';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BSTMAIN />
  </React.StrictMode>
);

const root1 = ReactDOM.createRoot(document.getElementById('root1'));
root1.render(
  <React.StrictMode>
    <AVL />
  </React.StrictMode>
);

const root2 = ReactDOM.createRoot(document.getElementById('root2'));
root2.render(
  <React.StrictMode>
    <TrieMain />
  </React.StrictMode>
);

const root3 = ReactDOM.createRoot(document.getElementById('root3'));
root3.render(
  <React.StrictMode>
    <MaxHeapMain />
  </React.StrictMode>
);

const root4 = ReactDOM.createRoot(document.getElementById('root4'));
root4.render(
  <React.StrictMode>
    <MinHeapMain />
  </React.StrictMode>
);

const root5 = ReactDOM.createRoot(document.getElementById('root5'));
root5.render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>
);




reportWebVitals();
