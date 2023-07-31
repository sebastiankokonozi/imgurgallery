import React, { lazy } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './pages/redux/store';
import ImageGrid from './screens/ImageGrid';

function App() {
  return (
    <Provider store={store}>
      <ImageGrid/>
    </Provider>
  );
}

export default App;
