import React, {Component} from 'react';
import NavbarComponent from "../components/navbarComponent";

class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/");
    }

    render() {
        return (
            <div className={"topnav"}>
                <NavbarComponent/>
            </div>
        );
    }
}

export default Home;