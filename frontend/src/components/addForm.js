import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Table from 'react-bootstrap/Table';

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            x: "",
            y: "",
            z: "",
            numBoxes: "",
            color: {'rgb': {'r':0, 'g':0, 'b':0, 'a':0}}
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
        if(value===null){
            value="";
        }
        if(['x', 'y', 'z', 'numBoxes'].includes(event.target.name)){
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
                        <Form.Label>Box Name</Form.Label>
                        <Form.Control
                            type={"text"}
                            name="id"
                            placeholder="Enter box name"
                            value={this.props.type === 'box' ? this.state.id : "Container"}
                            onChange={this.handleChange}
                            disabled={this.props.type !== "box"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Length (x)</Form.Label>
                        <Form.Control
                            type="number"
                            step='0.01'
                            placeholder="Enter Box Length"
                            value={this.state.x}
                            name="x"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Width (y)</Form.Label>
                        <Form.Control
                            type="number"
                            step='0.01'
                            placeholder="Enter Box Width"
                            value={this.state.y}
                            name="y"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Height (z)</Form.Label>
                        <Form.Control
                            type="number"
                            step='0.01'
                            placeholder="Enter Box Height"
                            value={this.state.z}
                            name="z"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number of Boxes</Form.Label>
                        <Form.Control
                            type="number"
                            step='0.01'
                            placeholder="Enter the Number of Boxes"
                            value={this.props.type === 'box' ? this.state.numBoxes : 1}
                            name="numBoxes"
                            onChange={this.handleChange}
                            disabled={this.props.type !=="box"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={this.addRow}>Submit</Button>
                    </Form.Group>

                </Form>

            </div>
        );
    }
}

export default AddForm;