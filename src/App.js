import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Auth from "./components/Auth";
import Session from "./components/Session";
import GoogleSession from "./components/GoogleSession";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route
          exact={true}
          path="/"
          render={() => (
            <div className="App">
              <Session />
            </div>
          )}
        />
        <Route
          exact={true}
          path="/home"
          render={() => (
            <div className="App">
              <Home />
            </div>
          )}
        />
        <Route
          path="/auth"
          render={(props) => (
            <div className="App">
              <Auth {...props} />
            </div>
          )}
        />
        <Route
          path="/googleSession"
          render={() => (
            <div className="App">
              <GoogleSession />
            </div>
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
