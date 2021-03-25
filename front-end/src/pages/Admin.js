import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import { TopMenu } from '../components';

function Admin() {
  const history = useHistory();
  const { user } = useContext(TrybeerContext);
  const { email, name } = user;

  if (!user.token) {
    history.push('/login');
  }

  return (
    <div>
      <TopMenu />
      <h1>Perfil</h1>
      <p data-testid="profile-name">
        Nome:
        {name}
      </p>
      <p data-testid="profile-email">
        Email:
        {email}
      </p>

    </div>
  );
}

export default Admin;
