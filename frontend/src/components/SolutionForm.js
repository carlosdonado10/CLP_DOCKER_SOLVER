import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import {DropdownButton} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

import './SolutionForm.css'

class SolutionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            solutions: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let uid = this.props.solutionService.getUserId();
        uid.then(response =>{
            this.setState({
                user_id: response.data.id
            })
            let solutionsPromise = this.props.solutionService.getSolutions(response.data.id);
            solutionsPromise.then(response => {
                this.setState({
                    solutions: response.data
                })
            })
        })
    }

    handleChange(event){
        // Name stores the position of the selected solution in this.state.solutions
        this.props.handleSolutionChange(this.state.solutions[event.target.name])
    }

    render() {
        let solutions = [];
        for(let i=0; i<this.state.solutions.length; i++){
            //TODO: Cambiar al nombre de la solución
            solutions.push(<Dropdown.Item eventKey={i} key={i} name={i} onClick={this.handleChange}>{this.state.solutions[i].id} </Dropdown.Item>)
        }


        return (
            <div>
                <Form>
                    <Form.Group controlId="solutionPicker">
                        <DropdownButton
                            style={{maxHeigh: "50px"}}
                            title={"Select a Solution"}
                            key={1}
                            id="solution-dropdown"
                            variant="secondary"
                        >
                            {solutions}
                        </DropdownButton>

                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default SolutionForm;