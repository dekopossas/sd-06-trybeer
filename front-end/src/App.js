import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';

import { NotFound, Login, Register, Profile,
  Products, Checkout, Orders, Error } from './pages';

import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/products" component={ Products } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/profile" component={ Profile } />
        <Route path="/orders" component={ Orders } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/error" component={ Error } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
