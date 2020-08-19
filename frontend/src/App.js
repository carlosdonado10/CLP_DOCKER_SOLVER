import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state ={
            loggedInStatus: false,
            user: {}
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(data){
        this.setState({
            loggedInStatus: true,
            user: data
        })
    }

    render() {
        return (
      <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} render={props =>(
                    <Home {... props}
                          loggedInStatus={this.state.loggedInStatus}
                          handleLogin={this.handleLogin}

                    />
                )}
                />
                <Route
                    exact path={"/Login"}
                    render={props => (
                        <Dashboard {...props} loggedInStatus={this.state.loggedInStatus}/>
                    )}
                />
            </Switch>
        </BrowserRouter>
      </div>
  );
    }
}

export default App;