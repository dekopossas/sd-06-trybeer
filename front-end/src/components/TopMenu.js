import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoBeerOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import TrybeerContext from '../context/TrybeerContext';
import SidebarMenu from './SideBarMenu';
import SidebarMenuAdmin from './SideBarMenuAdmin';
import './ComponentsCSS/TopMenu.css';

const TopMenu = ({ titleMenu }) => {
  const { user, isVisible, setVisibility } = useContext(TrybeerContext);

  return (
    <div>
      { isVisible && user.role === 'client' && <SidebarMenu /> }
      { isVisible && user.role === 'administrator' && <SidebarMenuAdmin /> }
      <header>
        <button
          type="button"
          id="side-menu"
          onClick={ setVisibility }
          data-testid="top-hamburguer"
        >
          <IconContext.Provider value={ { size: '2em' } }>
            <GiHamburgerMenu />
          </IconContext.Provider>
        </button>
        <p
          className="Trybeer"
          data-testid="top-title"
        >
          { titleMenu }
        </p>
        <Link to="/products">
        <IconContext.Provider value={ { size: '3em', color: 'white' } }>
          <IoBeerOutline />
        </IconContext.Provider>
        </Link>
      </header>
    </div>
  );
};

TopMenu.propTypes = {
  titleMenu: PropTypes.string,
};

export default TopMenu;
