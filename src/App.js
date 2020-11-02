import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header/Header';
import ToDo from './components/Todo/ToDo';



function App() {
  return (
    <>
      <Header />
      <ToDo />
    </>  
  );
}

export default App;
