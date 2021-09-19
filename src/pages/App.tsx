import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoPage from "./VideoPage";
import MainPage from "./MainPage";
import AboutPage from "./AboutPage";
import "./App.css";
import supportedLanguages from "../supportedLanguages";

function App() {
  useEffect( () => {
    let langName = supportedLanguages[process.env.REACT_APP_LANGUAGE!];
    document.title = `${langName.charAt(0).toUpperCase() + langName.slice(1)} Vocab Explorer`
  }, [])


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
