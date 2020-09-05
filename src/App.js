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
      <Product name="Nike" price="300 USD" description="Sneakers (Made in Thailand)" />
      <hr/>
      <Product name="Adidas" price="120 USD" description="Sneakers (Made in Germany)" />
      <hr/>
      <Product name="Puma" price="50000 AMD" description="Sneakers (Made in China)" />
    </div>
  );
}

export default App;
