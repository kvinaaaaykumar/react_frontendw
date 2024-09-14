import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers';
import { store } from './store/store';
import { Provider  } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>,
  document.getElementById('root')
);
