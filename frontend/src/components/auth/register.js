import React, {Component} from 'react';


import Axios from 'axios';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleSubmit(event){
        console.log("form submitted");
        Axios.post('http://localhost:8080/user', {
                email: this.state.email,
                password: this.state.password
            }
        ).then(response => {
            console.log("registration response", response)
        }).catch(error => {
            console.log("registration error", error)
        });
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" name="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                        <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                        <input type="password" name="password_confirmation" className="form-control" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required/>
                        <button type="submit" className="submit-field">Register</button>
                    </form>
        );
    }
}

export default Registration;