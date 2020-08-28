import React, {Component} from 'react';
import Auth from "../components/auth";
import NavbarComponent from "../components/navbarComponent";
import Col from 'react-bootstrap/Col'

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push('/')

    }

    render() {
        return (
            <div>
                <div>
                    <NavbarComponent pushLogin={this.props.pushLogin}/>
                </div>
                <Col md={{ span: 4, offset: 4}}>

                    <Auth
                        loggedInStatus = {this.props.loggedInStatus}
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                        authService={this.props.authService}
                        type={this.props.type}
                        history ={this.props.history}
                    />
                </Col>
            </div>
        );
    }
}

export default Authentication;