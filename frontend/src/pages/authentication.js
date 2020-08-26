import React, {Component} from 'react';
import Auth from "../components/auth";
import NavbarComponent from "../components/navbarComponent";

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <div>
                    <NavbarComponent/>
                </div>
                <div className={"formdiv"}>

                    <Auth
                        loggedInStatus = {this.props.loggedInStatus}
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                        authService={this.props.authService}
                        type={this.props.type}
                    />
                </div>
            </div>
        );
    }
}

export default Authentication;