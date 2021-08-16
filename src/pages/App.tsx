import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoPage from "./VideoPage";
import MainPage from "./MainPage";
import AboutPage from "./AboutPage";
import "./App.css";

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
          <Route exact path={"/about"}>
            <AboutPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
