import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWrapper from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
