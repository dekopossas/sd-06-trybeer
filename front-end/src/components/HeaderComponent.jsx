import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBarComponent';
import '../style/HeaderCostumer.css';

const logo = require('../images/logo_provisorio.png');
const buttonHamburguer = require('../images/hamburguer.png');

function Header({ text, id }) {
  const [renderSideBar, setRenderSideBar] = useState(false);

  return (
    <>
      <div className="header_costumer">
        <div className="dropdown">
          <button
            type="button"
            id="fome-hamburger"
            name="McDonalds"
            className="bttn-menu-costumer"
            data-testid="top-hamburguer"
            onClick={ () => setRenderSideBar(!renderSideBar) }
          >
            <img
              src={ buttonHamburguer }
              className="img-menu-costumer"
              alt="ham-btn"
            />
          </button>
        </div>
        <h1 data-testid={ id } className="title">{text}</h1>
        <img
          src={ logo }
          className="img-logo"
          alt="logo"
        />
      </div>
      <div className="sidebar">
        {(renderSideBar) && <SideBar text="TryBeer" id="top-title" />}
      </div>
    </>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Header;
