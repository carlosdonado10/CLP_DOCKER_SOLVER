import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            x: 0,
            y: 0,
            z: 0,
            numBoxes: 0
        }
        this.addRow = this.addRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        if(this.props.type !== "box"){
            this.setState({
                id: "container",
                numBoxes: 1
            })
        }
    }

    addRow(){

        this.props.addItem(Object.assign(this.state,{}));
        this.setState({
            id: "",
            x: "",
            y: "",
            z: "",
            numBoxes: ""
        })
    }

    handleChange(event){
        let value = event.target.value;
        if(event.target.name in ['x', 'y', 'z', 'numBoxes']){
            value = parseInt(value);
        }
        this.setState({
            [event.target.name]: value
        })
    }
    render() {
        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="ID"
                                    name="id"
                                    value={this.props.type === "box" ? this.state.id : "Container"}
                                    onChange={this.handleChange}
                                    disabled={this.props.type !== "box"}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="number"
                                    placeholder="Length (x)"
                                    name="x"
                                    value={this.state.x}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="number"
                                    placeholder="Width (y)"
                                    name="y"
                                    value={this.state.y}
                                    onChange={this.handleChange}/>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="number"
                                    placeholder="Height (z)"
                                    name="z"
                                    value={this.state.z}
                                    onChange={this.handleChange}

                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="number"
                                    placeholder="Number of boxes"
                                    name="numBoxes"
                                    value={this.props.type ==="box" ? this.state.numBoxes: 1}
                                    onChange={this.handleChange}
                                    disabled={this.props.type !== "box"}
                                />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Row>
                        <Button variant="primary" type="button" onClick={this.addRow}>
                            Add {this.props.type}
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default AddForm;