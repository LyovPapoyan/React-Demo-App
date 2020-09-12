import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';

import Header from './components/Header/Header';
import ToDo from './components/Todo/ToDo';



function App() {
  return (
    <Container>
      <Header />
      <ToDo />
    </Container>
  );
}

export default App;
