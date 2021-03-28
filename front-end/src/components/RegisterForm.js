import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchFunctions from '../api/fetchFunctions';
import TrybeerContext from '../context/TrybeerContext';
import './ComponentsCSS/RegisterForm.css';

const RegisterForm = (props) => {
  const { setUserLogged } = useContext(TrybeerContext);
  const [spam, setSpam] = useState(false);
  const {
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onCheck,
    disabled,
    history,
    isChecked,
    email,
    name,
    password,
  } = props;

  const onHandleClick = async () => {
    const role = isChecked ? 'admin' : 'client';
    const user = {
      name, email, password, role,
    };

    const response = await fetchFunctions.post('register', user);
    setUserLogged(response);

    if (response.message === 'User is already registered') return setSpam(true);
    return history.push(isChecked ? '/admin/orders' : '/products');
  };

  return (
    <form className="register-form">
      <label htmlFor="name" className="form-label">
        Nome:
        <input
          data-testid="signup-name"
          className="form-control"
          type="text"
          name="name"
          placeholder="Jose da Silva"
          id="name"
          onChange={ onChangeName }
        />
      </label>
      <label htmlFor="email" className="form-label">
        Email:
        <input
          data-testid="signup-email"
          className="form-control"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={ onChangeEmail }
        />
      </label>
      <label htmlFor="password" className="form-label">
        Senha:
        <input
          data-testid="signup-password"
          className="form-control"
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          onChange={ onChangePassword }
        />
      </label>
      <label htmlFor="checkbox" className="form-check-label">
        <input
          data-testid="signup-seller"
          className="form-check-input"
          type="checkbox"
          name="role"
          id="checkbox"
          onChange={ onCheck }
        />
        Quero vender
      </label>
      <button
        data-testid="signup-btn"
        type="button"
        disabled={ disabled }
        onClick={ onHandleClick }
      >
        Cadastrar
      </button>
      <span>
        { spam ? 'E-mail already in database.' : '' }
      </span>
    </form>
  );
};

RegisterForm.propTypes = {
  onChangeName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default RegisterForm;
