import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {Login} from './pages'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  )
}

export default App;
