import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormSubmit from "./components/FormSubmit";
import FormSubmissions from "./components/FormSubmissions";
import FormList from "./components/FormList";

/**
 * @name App
 * The main Component of our application
 * used to switch (route) the display between semi components
 */
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">Wix Form Generator</a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Forms List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/formbuilder"} className="nav-link">
                    Build Form
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={FormList} />
            <Route exact path="/formbuilder" component={FormBuilder} />
            <Route path="/form/:id" component={FormSubmit} />
            <Route path="/displayformdata/:id" component={FormSubmissions} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
