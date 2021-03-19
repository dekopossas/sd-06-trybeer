import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

import productsFetch from '../services/ProductsService';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [tokenInvalid, setTokenInvalid] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [sucessmsg, setSucessmsg] = useState(false);

  const totalSum = () => {
    const allPrices = cart.map((element) => element.totalPrice);
    const total = sumTotal(allPrices);
    setTotalValue(total);
    return total;
  };

  async function getAllProducts() {
    const products = await productsFetch();
    if (products.message) {
      setTokenInvalid(true);
      setIsFetching(true);
    } else {
      setTokenInvalid(false);
      setAllProducts(products);
      setIsFetching(false);
    }
  }

  async function updateProduct({ id, price, nome, qtd, totalPrice }) {
    const clickedProduct = { id, price, nome, qtd, totalPrice };
    const cartProducts = cart.filter((item) => item.id !== id);
    if (clickedProduct.qtd > 0) {
      const newProducts = [...cartProducts, clickedProduct];
      setCart(newProducts);
      localStorage.setItem('Cart', JSON.stringify(newProducts));
    } else if (clickedProduct.qtd === 0) {
      const updatedProducts = cart.filter((item) => item.id !== id);
      setCart(updatedProducts);
      localStorage.setItem('Cart', JSON.stringify(updatedProducts));
    }
  }

  function handleDeleteClick(selectedProduct) {
    const cartProducts = cart.filter((item) => item.id !== selectedProduct.id);
    setCart(cartProducts);
    localStorage.setItem('Cart', JSON.stringify(cartProducts));
  }

  useEffect(() => {
    const cartTotal = localStorage.getItem('CartTotal');
    const localStgCart = JSON.parse(localStorage.getItem('Cart'));
    if (localStgCart) {
      setCart(localStgCart);
    }
    if (cartTotal) {
      setTotalValue(cartTotal);
    }
  }, []);

  const contextValue = {
    email,
    setEmail,
    password,
    setPass,
    name,
    setName,
    role,
    setRole,
    isFetching,
    setIsFetching,
    allProducts,
    setAllProducts,
    getAllProducts,
    quantity,
    setQuantity,
    updateProduct,
    cart,
    setCart,
    tokenInvalid,
    setTokenInvalid,
    street,
    setStreet,
    number,
    setNumber,
    totalValue,
    setTotalValue,
    handleDeleteClick,
    sucessmsg,
    setSucessmsg,
    totalSum,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
