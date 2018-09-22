import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import routes from './routes'
import Dashboard from './components/dashboard/Dashboard';
import "./css/lapak.css";
import "./css/helep.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {routes.map(route => (
            <Route exact path={route.path} component={route.component} />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
