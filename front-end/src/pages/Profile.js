import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SidebarMenu from '../components/SideBarMenu';
import TopMenu from '../components/TopMenu';
import fetchFunctions from '../api/fetchFunctions';

function Profile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const TIME_TO_REDIRECT = 3000;

  const setConfig = async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
    setName(user.name);
  };

  const onChangeName = ({ target: { value } }) => {
    if (name === value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchFunctions.put('register', { name: e.target.form[0].value, email });
    const { history } = props;
    setIsUpdated(true);
    setTimeout(() => history.push('/login'), TIME_TO_REDIRECT);
  };

  useEffect(() => { setConfig(); }, [isUpdated]);

  return (
    <div>
      <TopMenu
        titleMenu="Meu perfil"
      />
      <SidebarMenu />
      <form method="put">
        <div className="content-panel">
          <label htmlFor="name">
            Name
            <input
              data-testid="profile-name-input"
              type="text"
              name="name"
              placeholder="Nome"
              id="name"
              onChange={ onChangeName }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              value={ email }
              readOnly="readonly"
              data-testid="profile-email-input"
              type="text"
              name="email"
              placeholder="Email"
              id="email"
            />
          </label>
          <button
            data-testid="profile-save-btn"
            type="submit"
            disabled={ disabled }
            onClick={ handleSubmit }
          >
            Salvar
          </button>
          {
            isUpdated && (<div> Atualização concluída com sucesso </div>)
          }
        </div>
      </form>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Profile;
