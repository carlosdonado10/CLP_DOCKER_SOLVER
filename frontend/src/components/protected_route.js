import React, {Component} from 'react';
import Route from "react-router/modules/Route";
import Redirect from "react-router/modules/Redirect";

class ProtectedRoute extends Component {
    render() {
        const {component: Component, ...props} = this.props;
        console.log(this.props.loggedInStatus)
        return (
            <Route

            />
        );
    }
}

export default ProtectedRoute;