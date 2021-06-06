import React, { useRef, useState } from 'react';

import styles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isValid = value => value.trim().length === 5;

const Checkout = props => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    cityCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeRef = useRef();
  const cityCodeRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalCodeRef.current.value;
    const enteredCity = cityCodeRef.current.value;

    const validName = !isEmpty(enteredName);
    const validStreetCode = !isEmpty(enteredStreet);
    const validPostal = isValid(enteredPostal);
    const validCity = !isEmpty(enteredCity);

    setFormInputValidity({
      name: validName,
      street: validStreetCode,
      postalCode: validPostal,
      cityCode: validCity,
    });

    const formIsValid =
      validName && validStreetCode && validPostal && validCity;

    if (!formIsValid) {
      return;
    }
  };

  const nameInputValid = `${styles.control} ${
    formInputValidity.name ? '' : styles.invalid
  }`;
  const streetInputValid = `${styles.control} ${
    formInputValidity.street ? '' : styles.invalid
  }`;
  const postalCodeInputValid = `${styles.control} ${
    formInputValidity.postalCode ? '' : styles.invalid
  }`;
  const cityInputValid = `${styles.control} ${
    formInputValidity.cityCode ? '' : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameInputValid}>
        <label htmlFor="name">Your name:</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter the valid name.</p>}
      </div>
      <div className={streetInputValid}>
        <label htmlFor="street">Street:</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter the valid street address.</p>}
      </div>
      <div className={postalCodeInputValid}>
        <label htmlFor="postal">Postal code:</label>
        <input type="text" id="postal" ref={postalCodeRef} />
        {!formInputValidity.postalCode && <p>Enter the valid postal code.</p>}
      </div>
      <div className={cityInputValid}>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" ref={cityCodeRef} />
        {!formInputValidity.cityCode && <p>Enter the valid city code.</p>}
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
