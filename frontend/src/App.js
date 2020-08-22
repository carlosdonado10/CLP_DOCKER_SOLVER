import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Authentication from "./pages/authentication";
import Home from "./pages/Home";
import './App.css';
import AuthService from "./_services/authService"
import Boxes from "./pages/boxes";
import Example from "./components/example";
import Container from "./pages/container";


class App extends Component {
    constructor() {
        super();
        this.state ={
            loggedInStatus: false,
            user: {},
            authService: new AuthService()

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
                        <Route exact path={"/"} component={Home}/>
                        <Route exact path={"/login"} render={props => (<Authentication {...props} handleLogin={this.handleLogin} authService={this.state.authService} type={'login'}/> )}/>
                        <Route exact path={"/register"} render={props => (<Authentication {...props} handleLogin={this.handleLogin} authService={this.state.authService} type={'register'}/>)}/>
                        <Route exact path={"/boxes"} render={props=> (<Boxes {...props}/>)}/>
                        <Route exact path={"/example"} component={Example}/>
                        <Route exact path={"/container"} render={props=> (<Container {...props}/>)}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;