import React from 'react';
import ReactDOM from 'react-dom';
// import { DatagridSample } from './DatagridSample';
import { BPSample } from './BP';
import './styling.scss';

ReactDOM.render(
  <React.StrictMode>
    <BPSample />
    {/* <DatagridSample /> */}
  </React.StrictMode>,
  document.getElementById('root')
);