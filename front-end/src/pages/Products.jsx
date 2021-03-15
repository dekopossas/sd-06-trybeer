import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fetchProducts from '../methods/products';
import renderCards from '../components/RenderCards';
import isLogged from '../components/isLogged';
import './Products.css';

const currencyFormat = (num) => num
  .toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [asd, setAsd] = useState(0);
  const itemQty = (prod) => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      const qty = items.filter((e) => e.id === prod.id);
      return qty.length;
    }
    return 0;
  };
  useEffect(() => {
    (async () => {
      setAllProducts(await fetchProducts());
    })();
  }, []);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      const ad = items.map((a) => a.price);
      if (ad !== []) {
        setCartTotal(ad.reduce((e, f) => +e + +f, 0));
        setAsd(items.length);
      }
    }
  }, [asd]);
  if (isLogged()) return <Redirect to="/login" />;
  return (
    <>
      <h1 style={ { marginLeft: '40px' } }>Products</h1>
      <section className="cards-container">
        {renderCards(allProducts, asd, setAsd, itemQty)}
        <Link to="/checkout" className="cart-link">
          <button
            type="button"
            className="cart-btn"
            disabled={ asd === 0 }
            data-testid="checkout-bottom-btn"
          >
            <p data-testid="checkout-bottom-btn-value">
              Ver Carrinho
              {' '}
              {currencyFormat(cartTotal)}
            </p>
          </button>
        </Link>
      </section>
    </>
  );
}

export default Products;
