import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastProvider} from 'react-toast-notifications';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react';
import { DataProvider } from './components/context';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <Router>
  <React.StrictMode>
    <DataProvider>
    <ToastProvider placement='top-left' >
 
    <App />

    </ToastProvider>
    </DataProvider>
  </React.StrictMode>
  </Router>
);


