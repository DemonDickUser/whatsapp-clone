import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Chat from "./Chat";
import SideBar from "./SideBar";
import Firstpage from "./Firstpage";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="App">
      <div className="app-body">
        {!user ? (
          <Firstpage />
        ) : (
          <Router>
            <SideBar />
            <Switch>
              <Route path="/groups/:groupId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        )}
      </div>
    </div>
  );
}
export default App;
