import React, { useContext, useEffect, useState } from 'react';
import ProductListItem from '../components/ProductListItem';
import TopMenu from '../components/TopMenu';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import AddressForm from '../components/AddressForm'

function Checkout() {
  const history = useHistory();
  const { cart, getFromLocalStorage, getTotalPriceCart } = useContext(TrybeerContext);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const recoveredCart = getFromLocalStorage('cart');
  const TITLE_MENU_CHECKOUT = "Finalizar Pedido";
  const TIME_TO_REDIRECT = 3000;
  const cartHasProducts = recoveredCart.length > 0;
  const validatePurchase = cartHasProducts && isFormFilled;
  
  useEffect(() => {
    console.log(validatePurchase)
  }, [cart, setIsFormFilled]);

  const handleCheckOut = () => {
    setTimeout(() => history.push('/products'), TIME_TO_REDIRECT);
  }

  return (
    <div>
      <TopMenu titleMenu={ TITLE_MENU_CHECKOUT } />
      <br/>
      <br/>
      <h2>Produtos</h2>
      {cartHasProducts ? recoveredCart.map(({id, name, quantity, price}, index) => (
        <ProductListItem
          key={ index }
          name={ name }
          index={ index }
          id={ id }
          quantity= { quantity }
          price={ price }
        />
      )) : <h3>Não há produtos no carrinho</h3>}
      <p data-testid="order-total-value">Total: {formatedPrice(getTotalPriceCart().toString())}</p>
      <AddressForm setIsFormFilled={ setIsFormFilled }/>
      <h3>{ isFormFilled && cartHasProducts ? 'Compra realizada com sucesso!' : ''}</h3>
      <button 
        type="button" 
        data-testid="checkout-finish-btn" 
        disabled={ !(isFormFilled && cartHasProducts) }
        onClick={ handleCheckOut }
      >
        Finalizar pedido
      </button>
    </div>
  );
}

export default Checkout;
