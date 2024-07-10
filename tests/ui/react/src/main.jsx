import React from 'react';
import ReactDOM from 'react-dom/client';
import { installTwicpics } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import "../../_/sample.css";
import config from '../../_/config';
import Sample from './Sample';

installTwicpics( config );

ReactDOM.createRoot( document.getElementById( `root` ) ).render(
    <React.StrictMode>
      <>
        <Sample/>
      </>
    </React.StrictMode>
);
