import React from 'react';
import propTypes from 'prop-types';

function OrderDetailCard({ indexId, quantity, name, unitPrice }) {
  const changedPrice = unitPrice.replace('.', ',');
  // const changedPrice = parseFloat(unitPrice);

  return (
    <div
      data-testid={ `${indexId}-order-card-container` }
      className="d-flex flex-sm-column justify-content-sm-between mx-5"
    >
      <div className="border border-bottom rounded my-3 shadow-sm btn-group">
        <div
          className="d-flex flex-fill flex-sm-row
          justify-content-sm-between m-2 btn-group mr-2"
        >
          <p data-testid={ `${indexId}-product-qtd` }>{quantity}</p>
          <p data-testid={ `${indexId}-product-name` }>{name}</p>
          <p data-testid={ `${indexId}-product-total-value` }>
            {`R$ ${changedPrice}`}
          </p>
        </div>
      </div>
    </div>
  );
}

OrderDetailCard.propTypes = {
  indexId: propTypes.number.isRequired,
  unitPrice: propTypes.string.isRequired,
  quantity: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
export default OrderDetailCard;
