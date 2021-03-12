import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validEmail, validPassword } from '../actions';
import { validate } from '../api/index';

class LoginDiv extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { dispatchEmail, dispatchPassword } = this.props;
    const validator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const maxLength = 5;
    if (name === 'email') {
      const isValid = validator.test(value.toLowerCase());
      if (isValid) {
        dispatchEmail(true);
      } else {
        dispatchEmail(false);
      }
    }
    if (name === 'password') {
      if (value.length > maxLength) {
        dispatchPassword(true);
      } else {
        dispatchPassword(false);
      }
    }
  }

  async handleLogin({ target }) {
    const { history } = this.props;
    const email = target.parentNode.parentNode.firstChild.childNodes[1].value;
    const password = target.parentNode.parentNode.firstChild.childNodes[3].value;
    const isValid = await validate(email, password);
    console.log(isValid);
    if (isValid[0].role === 'administrator') {
      history.push('/admin/orders');
    } else {
      history.push('/products');
    }
  }

  render() {
    const { validRegEmail, validRegPassword, history } = this.props;
    return (
      <div className="login-container">
        <div className="input-div">
          <span>Email</span>
          <input
            name="email"
            placeholder="Digite seu Email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <span>Senha</span>
          <input
            name="password"
            type="password"
            placeholder="Digite sua Senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </div>
        <div className="button-div">
          <button
            type="button"
            className="btn-login"
            data-testid="signin-btn"
            disabled={ !validRegEmail || !validRegPassword }
            onClick={ (event) => this.handleLogin(event) }
          >
            ENTRAR
          </button>
          <button
            type="button"
            className="btn-create"
            data-testid="no-account-btn"
            onClick={ () => history.push('/register') }
          >
            Ainda não tenho conta
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  validRegEmail: state.login.email,
  validRegPassword: state.login.password,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (boolean) => dispatch(validEmail(boolean)),
  dispatchPassword: (boolean) => dispatch(validPassword(boolean)),
});

LoginDiv.propTypes = {
  history: PropTypes.shape().isRequired,
  validRegEmail: PropTypes.bool.isRequired,
  validRegPassword: PropTypes.bool.isRequired,
  dispatchEmail: PropTypes.func.isRequired,
  dispatchPassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginDiv);
