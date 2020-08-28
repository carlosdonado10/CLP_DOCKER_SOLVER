import React, {Component} from 'react';
import Col from 'react-bootstrap/Col'

import NavbarComponent from "../components/navbarComponent";
import AddForm from "../components/addForm";
import RowTable from "../components/rowTable";
import './boxes.css'

class Boxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxes: []
        }
        this.addBox = this.addBox.bind(this);
        this.submit = this.submit.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    addBox(box){
        let boxes = Object.assign(this.state.boxes, {});
        boxes.push(box);
        this.setState({
            boxes: boxes
        })
    }

    handleColorChange(i, color){
        let boxes = Object.assign(this.state.boxes, []);
        boxes[i].color = color
        this.setState({
            boxes: boxes
        })
    }

    submit(){
        localStorage.setItem('boxes', JSON.stringify(this.state.boxes));
        this.props.history.push('/container');
    }
    render() {
        return (
            <div>
                <div>
                    <NavbarComponent pushLogin={this.props.pushLogin}/>
                </div>
                <br/>
                <div className="row">
                    <Col md={{span: 4, offset: 1}}>
                        <h2>Add Boxes</h2>
                        <AddForm addItem={this.addBox} type={"box"} />
                    </Col>
                    <Col md={{span: 5, offset: 1}}>
                        <h2>Current Schema</h2>
                        <RowTable boxes={this.state.boxes} submit={this.submit} handleColorChange={this.handleColorChange} type={"box"}/>
                    </Col>
                </div>

            </div>
        );
    }
}

export default Boxes;