import React, {Component} from 'react';


import Axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            login_errors: ""
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit(event){
        Axios.get( `http://localhost:8080/user/${this.state.email}/${this.state.password}`
        ).then(response => {
            console.log(response.data);
            this.props.handleSuccessfulAuth(response.data);

        }).catch(error => {
            console.log("registration error", error)
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>login status: {this.props.loggedInStatus}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    <button type="submit" className="submit-field">Register</button>
                </form>
            </div>
        );
    }
}

export default Login;