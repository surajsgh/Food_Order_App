import React, { useState } from 'react';

import CartProvider from './store/CartProvider';
import Header from '../src/Layout/Header';
import Meals from '../src/Meals/Meals';
import Cart from './Cart/Cart';

function App() {
  const [showCart, setShowCart] = useState(false);

  const openCartHandler = () => setShowCart(true);

  const closeCartHandler = () => setShowCart(false);

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={closeCartHandler} />}
      <Header onShowCart={openCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
