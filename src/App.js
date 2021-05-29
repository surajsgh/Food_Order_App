import React, { Fragment } from 'react';

import Header from '../src/Layout/Header';
import Meals from '../src/Meals/Meals';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
