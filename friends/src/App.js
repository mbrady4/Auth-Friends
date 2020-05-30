import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/login.js';
import Friends from './components/Friends.js';
import PrivateRoute from './components/PrivateRoute.js';
import Add from './components/Add.js';

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to='/friends'>Friends</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path='/friends' component={Friends}/>
          <PrivateRoute exact path='/add' component={Add} />
          <Route path='/login' component={Login} />
          <Route component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
