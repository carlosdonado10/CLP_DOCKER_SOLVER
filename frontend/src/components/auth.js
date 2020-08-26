import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            full_name: "",
            password: "",
            password_confirmation: "",
            login_errors: ""
        }
        this.handleLogin=this.handleLogin.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleRegistration=this.handleRegistration.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleLogin(event){
        this.props.authService.login(this.state.username, this.state.password);
        this.setState({
            username: "", password: ""
        });
        this.props.handleSuccessfulAuth()
        event.preventDefault();
    }

    handleRegistration(event){

        this.props.authService.register(this.state);
        this.props.authService.login(this.state.username, this.state.password);
        this.setState({
            username: "", password: "", email: "", password_confirmation: "", full_name: ""
        });
        this.props.handleSuccessfulAuth()
        event.preventDefault();
    }

    renderLogin(){
        return (
            <div>
                <h1>{this.props.type}</h1>
                <Form onSubmit={this.handleLogin}>
                    <FormControl type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                    <FormControl type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    <button type="submit" className="submit-field">Log in</button>
                </Form>
            </div>
        );
    }

    renderRegister(){
        return(
            <div>
                <h1>Reg form</h1>
                <form onSubmit={this.handleRegistration}>
                    <input type={"text"} name={"username"} className={"form-control"} placeholder={"Username"} value={this.state.username} onChange={this.handleChange}/>
                    <input type={"email"} name={"email"} className={"form-control"} placeholder={"Email"} value={this.state.email} onChange={this.handleChange}/>
                    <input type={"text"} name={"full_name"} className={"form-control"} placeholder={"Full Name"} value={this.state.full_name} onChange={this.handleChange}/>
                    <input type={"password"} name={"password"} className={"form-control"} placeholder={"Password"} value={this.state.password} onChange={this.handleChange}/>
                    <input type={"password"} name={"password_confirmation"} className={"form-control"} placeholder={"Password Confirmation"} value={this.state.password_confirmation} onChange={this.handleChange}/>
                    <button type="submit" className="submit-field">Log in</button>
                </form>
            </div>
        )
    }

    render() {
            if(this.props.type==='login') {
                return(this.renderLogin());
            }else if(this.props.type==='register'){
                return(this.renderRegister());
            }
    }
}

export default Auth;