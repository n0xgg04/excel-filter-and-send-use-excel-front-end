import React from 'react';
// eslint-disable-next-line
import {Provider} from "react-redux";
import { configureStore } from '@reduxjs/toolkit'
import allReducers from './redux/reducers'
import Router from './routes';

const store = configureStore({
    reducer: allReducers
});

function App() {
  return (
      <Provider store={store}>
          <Router/>
      </Provider>
  );
}

export default App;
