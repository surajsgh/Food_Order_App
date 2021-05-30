import React, { Fragment } from 'react';

import Header from '../src/Layout/Header';
import Meals from '../src/Meals/Meals';
import Cart from './Cart/Cart';

function App() {
  return (
    <Fragment>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
