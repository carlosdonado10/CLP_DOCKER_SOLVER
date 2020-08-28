import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

class NavbarComponent extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem('login');
        // this.props.pushLogin();
    }



    render() {
        return (
            <div id={"navbarComponent"}>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">CLP Solver</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/boxes">New Plan</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                         <Button variant="outline-success" onClick={this.logout}>LogOut</Button>
                    </Form>

                </Navbar>
            </div>
        );
    }
}

export default NavbarComponent;