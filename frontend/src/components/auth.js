import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button'

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
        let promise = this.props.authService.login(this.state.username, this.state.password, this.props.history);
        promise.then(response => {
            console.log(`#auth.js: ${console.log(response.data)}`);
            localStorage.setItem('login', JSON.stringify(response.data));
            this.setState({
                username: "", password: ""
            });

            this.props.handleSuccessfulAuth()
            event.preventDefault();
        }).catch(err =>{
            console.log(`#auth.js: ${console.warn(err)}`)
        })
    event.preventDefault();
    }

    handleRegistration(event){

        this.props.authService.register(this.state, this.state.username, this.state.password, this.props.history);
        // this.props.authService.login(this.state.username, this.state.password);
        this.setState({
            username: "", password: "", email: "", password_confirmation: "", full_name: ""
        });
        this.props.handleSuccessfulAuth()
        event.preventDefault();
    }

    renderLogin(){
        return (
            <div>
                <h1>Log In</h1>
                <Form onSubmit={this.handleLogin}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <FormControl type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <FormControl type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" onClick={this.handleLogin}>Register!</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    renderRegister(){
        return(
            <div>
                <h1>Registration</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type={"text"} name="username" placeholder={"Enter Username"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter Email" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="full_name" placeholder="Enter Full Name" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter Password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="password_confirmation" placeholder="Enter Your Password Again" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" onClick={this.handleRegistration}>Register!</Button>
                    </Form.Group>
                </Form>


                {/*<form onSubmit={this.handleRegistration}>*/}
                {/*    <input type={"text"} name={"username"} className={"form-control"} placeholder={"Username"} value={this.state.username} onChange={this.handleChange}/>*/}
                {/*    <input type={"email"} name={"email"} className={"form-control"} placeholder={"Email"} value={this.state.email} onChange={this.handleChange}/>*/}
                {/*    <input type={"text"} name={"full_name"} className={"form-control"} placeholder={"Full Name"} value={this.state.full_name} onChange={this.handleChange}/>*/}
                {/*    <input type={"password"} name={"password"} className={"form-control"} placeholder={"Password"} value={this.state.password} onChange={this.handleChange}/>*/}
                {/*    <input type={"password"} name={"password_confirmation"} className={"form-control"} placeholder={"Password Confirmation"} value={this.state.password_confirmation} onChange={this.handleChange}/>*/}
                {/*    <button type="submit" className="submit-field">Log in</button>*/}
                {/*</form>*/}
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