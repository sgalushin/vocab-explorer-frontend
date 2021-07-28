import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import VideoPage from "./VideoPage";

import "./App.css";
import MainPage from "./MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={["/", "/youtube"]}>
            <MainPage />
          </Route>
          <Route exact path={"/youtube/:videoId"}>
            <VideoPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
