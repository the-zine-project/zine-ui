import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './containers/Home';
import Magazines from './containers/Magazines';

const App = () => (
  <Router>
    <div className="app-container">
      <nav className="app-header pt-navbar modifier pt-fixed-top">
        <div className="pt-navbar-group pt-align-left">
          <h3>The Zine</h3>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <button className="pt-button pt-minimal pt-icon-home">
            <Link to="/">Home</Link>
          </button>
          <button className="pt-button pt-minimal pt-icon-document">
            <Link to="/magazines">Magazines</Link>
          </button>
          <span className="pt-navbar-divider" />
          <button className="pt-button pt-minimal pt-icon-user" />
          <button className="pt-button pt-minimal pt-icon-notifications" />
          <button className="pt-button pt-minimal pt-icon-cog" />
        </div>
      </nav>

      <div className="app-body">
        <Route exact path="/" component={Home} />
        <Route exact path="/magazines" component={Magazines} />
      </div>
    </div>
  </Router>
);

export default App;
