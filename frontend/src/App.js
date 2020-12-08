import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

// import ProtectedRoute from "./components/protectedRoute";
import Authentication from "./pages/authentication";
import Home from "./pages/Home";
import './App.css';
import AuthService from "./_services/authService"
import SolutionsService from "./_services/solutionsService"
import Boxes from "./pages/boxes";
import Container from "./pages/container";



class App extends Component {
    constructor() {
        super();
        this.state ={
            loggedInStatus: false,
            user: {},
            authService: new AuthService(),
            solutionService: new SolutionsService()
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.pushLogin = this.pushLogin.bind(this);
    }

    handleLogin(data){
        this.setState({
            loggedInStatus: true,
            user: data
        })
    }

    pushLogin(){
        this.props.history.push('/login')
    }



    render() {

        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/login"} render={props => (<Authentication {...props} handleLogin={this.handleLogin} authService={this.state.authService} type={'login'}/> )}/>
                        <Route exact path={"/register"} render={props => (<Authentication {...props} handleLogin={this.handleLogin} authService={this.state.authService} type={'register'}/>)}/>
                        <Route exact path={"/boxes"} render={props=> (<Boxes {...props} pushLogin={this.pushLogin} />)}/>
                        <Route exact path={"/container"} render={props=> (<Container {...props} optimizerService={this.state.solutionService} pushLogin={this.pushLogin} />)}/>
                        <Route
                            exact
                            path={"/"}
                            component={() => <Home solutionService={this.state.solutionService} pushLogin={this.pushLogin} {...this.props}/>}
                        />
                        {/*<Route*/}
                        {/*    exact*/}
                        {/*    path={"/boxes"}*/}
                        {/*    component={() => <Boxes {...this.props} pushLogin={this.pushLogin} />}*/}
                        {/*/>*/}
                        {/*<Route*/}
                        {/*    exact*/}
                        {/*    path={"/container"}*/}
                        {/*    component={() => <Container {...this.props} optimizerService={this.state.solutionService} pushLogin={this.pushLogin} />}*/}
                        {/*/>*/}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;