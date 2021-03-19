import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MenuAdmin from '../components/MenuAdmin';
import CartItem from '../components/CartItem';
import { getSaleByID } from '../services/salesServices';
import Button from '../components/Button';

function OrderDetails({ match }) {
  const [orders, setOrders] = useState([]);
  const [orderDone, setOrderDone] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  const { id } = match.params;

  const getOrders = async () => {
    const result = await getSaleByID(id);
    setOrders(result);
    setOrderStatus(result[0].Status);
    setTotalValue(result[0].total.replace('.', ','));
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleClick = () => {
    setOrderDone(true);
    setOrderStatus('Entregue');
  };

  return (
    <div>
      <MenuAdmin />
      <p data-testid="order-number">{ `Pedido ${id}` }</p>
      <p data-testid="order-status">{ orderStatus }</p>
      { orders.map((order, index) => (
        <CartItem
          key={ index }
          index={ index }
          quantity={ order.quantidade }
          name={ order.product }
          price={ order.price }
          unitPrice="order-unit-price"
        />)) }
      <p data-testid="order-total-value">{`Total: R$ ${totalValue}`}</p>
      {!orderDone && (
        <Button
          title="Marcar como entregue"
          dataTestid="mark-as-delivered-btn"
          handleClick={ handleClick }
          btnDisabled={ false }
        />
      )}
    </div>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default OrderDetails;
