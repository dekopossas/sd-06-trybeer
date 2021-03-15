import React from 'react';
import PropTypes from 'prop-types';
import SButton from './style';

const Button = ({ disabled, onClick, children, color, txtColor, dataTestId }) => (
  <SButton
    data-testid={ dataTestId }
    type="button"
    disabled={ disabled }
    onClick={ onClick }
    style={ { backgroundColor: color, color: txtColor } }
  >
    { children }
  </SButton>
);

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.string,
  txtColor: PropTypes.string,
  dataTestId: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => console.log('click'),
  disabled: false,
  children: 'Entrar',
  color: '',
  txtColor: '',
  dataTestId: '',
};

export default Button;
