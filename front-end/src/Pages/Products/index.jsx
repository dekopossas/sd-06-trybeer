import React from 'react';
import CardProduct from '../../Components/CardProduct';
import Menu from '../../Components/Menu';

const Products = () => (
  <>
    <Menu><p data-testid="top-title">TryBeer</p></Menu>
    <CardProduct />
    <h1>Produtos</h1>
  </>
);
export default Products;
