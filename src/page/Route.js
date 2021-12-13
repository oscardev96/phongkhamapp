import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Appointment from "./appointment/Appointment";
import Drug from "./drug/Drug";
import Home from "./home/Home";



export default function Route() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/appointment">cuoc kham</Link>
          </li>
          <li>
            <Link to="/drug">thuoc</Link>
          </li>
        </ul>

        <hr />

      
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/appointment">
            <Appointment />
          </Route>
          <Route path="/drug">
            <Drug />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}