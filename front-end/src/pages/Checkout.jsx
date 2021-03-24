import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TopMenu from '../components/TopMenu/TopMenu';
import CheckoutProductsCard from '../components/CheckoutProductsCard';
import CheckoutDetails from '../components/checkoutDetails/CheckoutDetails';
import productsContext from '../context/productsContext';
// import fetches from '../services/fetches';

export default function Checkout() {
  const { setCartProducts } = useContext(productsContext);
  const history = useHistory();
  const tokenFromLocalStorage = localStorage.getItem('token');

  useEffect(() => {
    const cartLS = JSON.parse(localStorage.getItem('cartProducts'));
    if (!cartLS) return;
    setCartProducts(cartLS.filter((product) => product.quantityItem !== 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
  };

  return (
    <div>
      { handleRedirect(tokenFromLocalStorage) }
      <TopMenu data-testid="top-title" pageTitle="Finalizar Pedido" />
      <CheckoutProductsCard />
      <CheckoutDetails />
    </div>
  );
}
