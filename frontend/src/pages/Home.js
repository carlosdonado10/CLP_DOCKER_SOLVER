import React, {Component} from 'react';
import Login from "../components/auth/login";

class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <div>
                <h1>Home!</h1>
                <Login
                    loggedInStatus = {this.props.loggedInStatus}
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                    />
            </div>
        );
    }
}

export default Home;