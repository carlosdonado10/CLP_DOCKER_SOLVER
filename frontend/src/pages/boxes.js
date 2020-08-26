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
                <div className={"container"}>
                    <div className="row">
                        <Col md={4}>
                            <div className={"main"}>
                                <AddForm addItem={this.addBox} type={"box"} />
                                <br/><br/>
                                <RowTable boxes={this.state.boxes} submit={this.submit}/>
                            </div>
                        </Col>
                        <Col md={{span: 4, offset: 4}}>
                            <div className={"main"}>
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
        );
    }
}

export default Boxes;