import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Provider from './context/Provider';
import {
  LoginPage,
  SignupPage,
  CostumerProfilePage,
  CostumerProductsPage,
  CostumerCheckoutPage,
  CostumerOrdersPage,
  CostumerOrdersDetailsPage,
  AdminProfilePage,
  AdminOrdersPage,
  AdminOrdersDetailsPage,
} from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
          <Switch>
            <Route exact path="/login" component={ LoginPage } />
            <Route exact path="/register" component={ SignupPage } />
            <Route exact path="/profile" component={ CostumerProfilePage } />
            <Route exact path="/products" component={ CostumerProductsPage } />
            <Route exact path="/checkout" component={ CostumerCheckoutPage } />
            <Route
              exact
              path="/orders"
              component={ CostumerOrdersPage }
            />
            <Route
              exact
              path="/orders/:id"
              component={ CostumerOrdersDetailsPage }
            />
            <Route exact path="/admin/profile" component={ AdminProfilePage } />
            <Route
              exact
              path="/admin/orders"
              component={ AdminOrdersPage }
            />
            <Route
              exact
              path="/admin/orders/:id"
              component={ AdminOrdersDetailsPage }
            />
            <Route exact path="/" component={ () => <Redirect to="/login" /> } />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
