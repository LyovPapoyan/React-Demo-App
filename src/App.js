import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Menu/Menu'
import Header from './components/Header/Header';
import ToDo from './components/Todo/ToDo';
import About from './pages/about/About';
import Contact from './pages/contacts/Contact';
import NotFound from './pages/not-found/Not-found';

import { Redirect, Route, Switch } from 'react-router-dom';



function App() {
  return (
    <>
      <Menu />
      <Header />
      <Switch>
        <Route path="/" component={ToDo} exact />
        <Route path="/about" component={About} exact />
        <Route path="/contacts" component={Contact} exact />
        <Route path="/not-found" component={NotFound} exact />
        <Redirect to="/not-found" component={NotFound} />
      </Switch>

    </>
  );
}

export default App;
