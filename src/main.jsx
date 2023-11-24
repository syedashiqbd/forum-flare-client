import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './Route/Route.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster></Toaster>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
