import React from 'react';
import './App.css';
import Header from './class-components/Header';
import Product from './class-components/Product'


// import Header from './components/Header';
// import UserList from './components/User-list';

function App() {
  return (
    <div>
      <Header />
      <Product name="Apple" price="300" description="Green apple from Armenia" />
      <hr/>
      <Product name="Mango" price="1200" description=" Mango from Armenia" />
    </div>
  );
}

export default App;
