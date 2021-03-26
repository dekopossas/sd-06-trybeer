import React, { useContext } from 'react';
// import React, { useContext, useCallback } from 'react';
// import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import AppContext from '../context/app.context';
import OrderCard from './OrderCard';
// import { convertDate } from '../utils';

export default function OrdersContainer({ orders }) {
  const { tokenContext: { token } } = useContext(AppContext);

  // const history = useHistory();

  const emptyOrders = (token.role === 'administrator')
    ? 'Não há pedidos no banco de dados.'
    : 'Você ainda não tem pedidos.';

  // const getOrderDetails = useCallback((id) => {
  //   if (token.role === 'administrator') return history.push(`/admin/orders/${id}`);
  //   history.push(`/orders/${id}`);
  // }, [history, token]);

  return (
    <section className="orders-container">
      { (orders.length < 1)
        ? <h4>{ emptyOrders }</h4>
        : orders.map((order, index) => (
          <OrderCard order={ order } index={ index } key={ order.id } />)) }
      {/* <section
        className="order-card"
        role="link"
        onClick={ () => getOrderDetails(id) }
        onKeyDown={ () => getOrderDetails(id) }
        tabIndex={ index }
        key={ `${index}-${id}` }
        data-testid={ `${index}-order-card-container` }
      >
        <section className="name" data-testid={ `${index}-order-number` }>
          { `Pedido ${id}` }
        </section>
        { (token.role === 'administrator') && (
          <span data-testid={ `${index}-order-address` }>
            { `${street}, ${number}` }
          </span>
        ) }
        <section className="total" data-testid={ `${index}-order-total-value` }>
          { `R$ ${totalPrice.replace('.', ',')}` }
        </section>
        <section className="date" data-testid={ `${index}-order-date` }>
          { convertDate(date)[0] }
          <br />
          { convertDate(date)[1] }
        </section>
        { (token.role === 'administrator') && (
          <span data-testid={ `${index}-order-status` }>{status}</span>
        ) }
      </section>
    )) } */}
    </section>
  );
}

OrdersContainer.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.any),
};

OrdersContainer.defaultProps = {
  orders: [],
};
