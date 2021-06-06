import React, { useRef } from 'react';

import styles from './Checkout.module.css';

const Checkout = props => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeRef = useRef();
  const cityCodeRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    enteredName = nameInputRef.current.value;
    enteredStreet = streetInputRef.current.value;
    enteredPostal = postalCodeRef.current.value;
    enteredCity = cityCodeRef.current.value;
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Your name:</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street:</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">Postal code:</label>
        <input type="text" id="postal" ref={postalCodeRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" ref={cityCodeRef} />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={styles.submit}>Submit</button>
      </div>
    </form>
  );
};

export default Checkout;
