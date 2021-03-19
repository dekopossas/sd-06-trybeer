import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { CheckoutCards } from '../components';
// import CheckoutCards from '../components/CheckoutCards';
import Header from '../components/HeaderComponent';
import BeersAppContext from '../context/BeersAppContext';

function CostumerCheckout() {
  const history = useHistory();
  const {
    user,
    productQuantity,
    amount,
  } = useContext(BeersAppContext);

  if (!user.token) history.push('/login');

  const [valid, setValid] = useState(false);
  const [inputValues, setInputValues] = useState({ street: '', number: '' });
  const [showMessage, setShowMessage] = useState('');
  const { street, number } = inputValues;

  const isValid = () => {
    if (street !== '' && number !== '' && productQuantity.length !== 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => {
    isValid();
  }, [inputValues, productQuantity]);

  const commaAmount = `${amount.toFixed(2)}`.replace('.', ',');

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const redirectingFinishedOrders = () => {
    const time = 2000;
    setShowMessage('Compra realizada com sucesso!');
    setTimeout(() => {
      history.push('/products');
    }, time);
  };

  return (
    <>
      <Header text="Finalizar Pedido" id="top-title" />
      <h1>Produtos</h1>
      <div>
        {productQuantity.length === 0 && (
          <p>Não há produtos no carrinho</p>
        )}
        {productQuantity.map((element, index) => (
          <div key={ element.id }>
            <CheckoutCards
              element={ element }
              index={ index }
            />
          </div>
        ))}
      </div>
      <p>Total: </p>
      <p data-testid="order-total-value">{`R$ ${commaAmount}`}</p>

      <p>Endereço</p>
      <form action="post">
        <label htmlFor="street">
          Rua:
          <input
            type="text"
            name="street"
            id="street"
            value={ street }
            onChange={ handleChange }
            data-testid="checkout-street-input"
          />
        </label>
        <label htmlFor="number">
          Número da casa:
          <input
            type="text"
            name="number"
            id="number"
            value={ number }
            onChange={ handleChange }
            data-testid="checkout-house-number-input"
          />
        </label>
        <button
          type="button"
          data-testid="checkout-finish-btn"
          disabled={ valid }
          onClick={ redirectingFinishedOrders }
        >
          Finalizar Pedido
        </button>
        <span>{ showMessage }</span>
      </form>
    </>
  );
}

export default CostumerCheckout;
