import React from "react";
import Home from "./routes/Home";
import Intro from "./routes/Intro";
import Profile from "./routes/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Intro} />
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
