import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
