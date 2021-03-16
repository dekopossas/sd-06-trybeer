import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';

const Cart = () => {
  const { cart } = useContext(TrybeerContext);
  const history = useHistory();

  const totalCart = useCallback(() => {
    if (cart.length > 0) {
      const total = cart
        .reduce((result, product) => result + (product.quantity * product.price), 0);
      return total;
    }
    return 0;
  });

  const disabledButton = totalCart() === null || totalCart() === 0;

  useEffect(() => {
    totalCart();
  }, [cart, totalCart]);

  return (
    <div>
      <button
        data-testid="checkout-bottom-btn"
        type="button"
        onClick={ () => history.push('/checkout') }
        disabled={ disabledButton }
      >
        Ver Carrinho
      </button>
      <p data-testid="checkout-bottom-btn-value">
        { `R$ ${totalCart().toFixed(2).replace('.', ',')}` }
      </p>
    </div>
  );
};

export default Cart;
