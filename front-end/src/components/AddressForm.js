import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddressForm = ({ setIsFormFilled }) => {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (street && number) {
      setIsFormFilled(true);
    }
  }, [street, number, setIsFormFilled]);

  return (
    <form>
      <label htmlFor="street">
        Rua:
        <input
          data-testid="checkout-street-input"
          type="text"
          name="street"
          value={ street }
          onChange={ (e) => setStreet(e.target.value) }
        />
      </label>
      <label htmlFor="street">
        Número da casa:
        <input
          data-testid="checkout-house-number-input"
          type="text"
          name="street"
          value={ number }
          onChange={ (e) => setNumber(e.target.value) }
        />
      </label>
    </form>
  );
};

AddressForm.propTypes = {
  setIsFormFilled: PropTypes.func.isRequired,
};

export default AddressForm;
