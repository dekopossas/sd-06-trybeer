import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const validator = require('validator');

function Provider({ children }) {
  const [register, setRegister] = useState({});
  const [validForm, setValidForm] = useState(false);
  const [validRegister, setValidRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const maxLength = 5;
    function validateForm(emailInput, passwordInput) {
      // const emailRegex = /\S+@\S+\.\S+/;
      if (validator.isEmail(emailInput) && passwordInput.length > maxLength) return setValidForm(true);
      // if (emailRegex.test(emailInput) && passwordInput.length > maxLength) return setValidForm(true);
      setValidForm(false);
    }
    validateForm(email, password);
  }, [email, password]);

  const validateRegister = (name, emailInput, passwordInput) => {
    // const emailReg = /\S+@\S+\.\S+/;
    const nameReg = /^[A-Za-z ]{2,30}$/;
    const maxlength = 12;
    const maxlengthPass = 6;
    if (name.length >= maxlength && nameReg.test(name) && validator.isEmail(emailInput)
    // if (name.length >= maxlength && nameReg.test(name) && emailReg(emailInput)
    && passwordInput.length >= maxlengthPass) return setValidRegister(true);
    setValidRegister(false);
  };

  const contextValue = {
    validForm,
    setValidForm,
    email,
    setEmail,
    password,
    setPassword,
    validateRegister,
    validRegister,
    register,
    setRegister,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.array,
]).isRequired };

export default Provider;
