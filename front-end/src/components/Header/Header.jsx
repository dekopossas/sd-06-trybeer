import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import SideBar from '../Sidebar/Sidebar';
import './Header.css';
import './hamburgers.css';

export default function Header({ title, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const isAdmin = user === 'admin' ? 'side-menu-admin' : 'side-menu-user';
  return (
    <div className={user === 'admin' ? 'isAdmin' : 'isUser'}>
      {
        user === 'client' && (
          <button
            type="button"
            className={`hamburger hamburger--stand ${isSidebarOpen ? 'is-active' : ''}`}
            data-testid="top-hamburguer"
            onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
          >
            {/* <FontAwesomeIcon icon={ faBars } size="lg" />  */}
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        )
      }
      <h1 className="trybeer-name" data-testid="top-title">
        { title }
      </h1>
      {/* <div class="spacer-admin"></div> */}
      {
        (
          <SideBar 
            user={ user } 
            isSidebarOpen={ isSidebarOpen } 
            setIsSidebarOpen={setIsSidebarOpen} 
          />
        )
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,

};
