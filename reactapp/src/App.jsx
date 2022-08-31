import React from "react";
import { BrowserRouter as Router,Redirect,Route,Switch } from "react-router-dom";
import Menu from './components/Menu'
import Rooms from "./components/Rooms";
import Workspaces from './components/Workspaces';
import Equipments from './components/Equipments';
import Read from './components/Read'
import Manage from './components/Manage'


export default () =>
{
    return (
      <div>
        <Router>
        <Menu/>
        <Switch>
          <Route path="/" exact component={Rooms}/>
          <Route path="/equipments" component={Equipments}/>
          <Route path="/workspaces" component={Workspaces}/>
          <Route path="/display" component={Read}/>
          <Route path="/manage" component={Manage}/>
        </Switch>
        </Router>
      </div>
    );
}