import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import SidebarMenu from '../components/SideBarMenu';
import TopMenu from '../components/TopMenu';
import fetchFunctions from '../api/fetchFunctions';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import TrybeerContext from '../context/TrybeerContext';

function Products({ history }) {
  const [products, setProducts] = useState([]);
  const { user } = useContext(TrybeerContext);

  const fetchProducts = async () => {
    await fetchFunctions.get('products').then((productsArray) => {
      setProducts(productsArray);
    });
  };

  const verifyIfUserIsLogged = () => {
    if (!user) {
      return history.push('/login');
    }
  };

  verifyIfUserIsLogged();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <TopMenu />
      <SidebarMenu />
      <div className="products-container">
        {products.map(({ id, name, price, url_image: urlImage }, index) => (
          <ProductCard
            id={ id }
            key={ index }
            name={ name }
            price={ price }
            url_image={ urlImage }
            index={ index }
          />
        ))}
      </div>
      <Cart />
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Products;
