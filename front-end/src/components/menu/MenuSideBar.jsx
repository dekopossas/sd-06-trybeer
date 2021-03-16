import React from 'react';
import '../../Menu.css';
import { useHistory } from 'react-router'
import { FiMenu } from 'react-icons/fi'

function MenuSideBar() {
  const history = useHistory()

  const handlePage = ({ target }) => {
    const { name } = target;
    history.push(`/${name}`);
  };

  return (
    <div className="side-menu-container menuSideBar">
      <span data-testid="top-hamburguer" className="menuIcon"
      ><FiMenu /></span>

      <button
        className="btnSideBar" data-testid="side-menu-item-products"
        onClick={(e) => handlePage(e)}
        name="products"
      >
        Produtos
      </button>
      <button
        className="btnSideBar" data-testid="side-menu-item-my-orders"
        onClick={handlePage}
        name="orders"
      >
        Meus pedidos
      </button>
      <button
        className="btnSideBar" data-testid="side-menu-item-my-profile"
        onClick={handlePage}
        name="profile"
      >
        Meu perfil
      </button>
      <button
        className="btnSideBar" data-testid="side-menu-item-logout"
        onClick={handlePage}
        name="login"
      >
        Sair
      </button>
    </div>
  );
}

export default MenuSideBar;
