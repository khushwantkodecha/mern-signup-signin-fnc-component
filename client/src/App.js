import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";

export default function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Signup} />
        <Route exact path="/sign-in" component={Signin} />
      </div>
    </Router>
  );
}
