import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect from="/" to="/login" />
        </Route>
        <Route path="/admin/orders" />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/products" />
      </Switch>
    </Router>
  );
}

export default App;
