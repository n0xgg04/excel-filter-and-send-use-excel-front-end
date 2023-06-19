import React from 'react';
// eslint-disable-next-line
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from './pages/homepage';
import {Provider} from "react-redux";
import { configureStore } from '@reduxjs/toolkit'
import allReducers from './redux/reducers'
import ManagePage from "./pages/managepage";

const store = configureStore({
    reducer: allReducers
})

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manage" element={<ManagePage />} />
            </Routes>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
