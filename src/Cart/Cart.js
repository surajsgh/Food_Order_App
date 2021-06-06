import React, { useContext, useState } from 'react';

import CartContext from '../store/cart-context';
import Checkout from '../Cart/Checkout';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  //  Remove the items
  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  //  Add the items
  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const showCheckOutFormHandler = () => setIsCheckout(true);

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const buttons = (
    <div className={styles.actions}>
      <button onClick={props.onHideCart} className={styles['button--alt']}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={showCheckOutFormHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onClose={props.onHideCart} />}
      {!isCheckout && buttons}
    </Modal>
  );
};

export default Cart;
