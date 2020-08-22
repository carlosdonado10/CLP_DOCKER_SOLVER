import React, {Component} from 'react';
import Col from 'react-bootstrap/Col'

import NavbarComponent from "../components/navbarComponent";
import AddForm from "../components/addForm";
import RowTable from "../components/rowTable"

class Boxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxes: []
        }
        this.addBox = this.addBox.bind(this);
        this.submit = this.submit.bind(this);
    }

    addBox(box){
        let boxes = Object.assign(this.state.boxes, {});
        boxes.push(box);
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
                    <NavbarComponent/>
                </div>
            <div className="row">
                <Col md={4}>
                    <AddForm addItem={this.addBox} type={"box"} />
                </Col>

                <Col md={{span: 4, offset: 4}}>
                    <RowTable boxes={this.state.boxes} submit={this.submit}/>
                </Col>
            </div>
            </div>
        );
    }
}

export default Boxes;