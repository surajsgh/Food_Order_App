import React, { Fragment } from 'react';

import mealImage from '../Assets/meals.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
