import React, { useContext, useState } from 'react';

import CartContext from '../store/cart-context';
import Checkout from '../Cart/Checkout';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmitted] = useState(false);

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

  const submitDataHandler = userData => {
    setIsSubmitting(true);
    setDidSubmitted(false);
    fetch(
      'https://food-order-application-8d176-default-rtdb.firebaseio.com/order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setDidSubmitted(true);
    setIsSubmitting(false);
    cartCtx.emptyCart();
  };

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

  const content = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitDataHandler} onClose={props.onHideCart} />
      )}
      {!isCheckout && buttons}
    </React.Fragment>
  );

  const sendingContent = <p>Sending data...</p>;

  const submittedData = (
    <React.Fragment>
      <p>Submitted data</p>
      <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles['button--alt']}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && content}
      {isSubmitting && sendingContent}
      {!isSubmitting && didSubmit && submittedData}
    </Modal>
  );
};

export default Cart;
