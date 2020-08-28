import React, {Component} from 'react';
import Axios from 'axios'
import {Redirect} from "react-router";
import {Route} from 'react-router-dom';


class ProtectedRoute extends Component {
    constructor(props, context) {
        super(props, context);

        this.state ={
            isLoading: true,
            isLoggedIn: false
        };

        let config={};
        let token = JSON.parse(localStorage.getItem('login'));
        if (token === null) {
            this.setState(() => ({isLoading: false, isLoggedIn: false}));
        }else{
            config = {
                headers: {
                    'Authorization': 'Bearer ' + token.access_token
                }
            }
        }
        Axios.get(`${process.env["REACT_APP_BASE_URL"]}/users/me`, config).then(response => {
            this.setState(() => ({isLoading: false, isLoggedIn: true}));
        }).catch(err => {
            this.setState(()=> ({isLoading: false, isLoggedIn: false}));
        })

    }

    render() {
        return (
            this.state.isLoading ? null:
                    this.state.isLoggedIn ?
                        <Route {...this.props} component={this.props.component} path={this.props.path} exact={this.props.exact}/> :
                        <Redirect to={{pathname:'/login'}}/>

        );
    }
}

export default ProtectedRoute;