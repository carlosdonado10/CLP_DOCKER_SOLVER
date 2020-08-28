import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';

import AddForm from "../components/addForm";
import RowTable from "../components/rowTable";
import NavbarComponent from "../components/navbarComponent";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxes: [{'id': 1, 'x': 1, 'y':1, 'z':1, 'numBoxes':1}],
            addedContainer: false,
            container: {
                id: "container",
                x: "",
                y: "",
                z: "",
                numBoxes: ""
            }
        }

        this.addItem = this.addItem.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.setState({
            boxes: JSON.parse(localStorage.getItem('boxes')),
        })
    }

    componentWillUnmount() {
        localStorage.removeItem('boxes')
    }

    addItem(container){


        this.setState({
               container: container
            }
        )
    }

    submit(){
        this.props.optimizerService.optimize(this.state.boxes, this.state.container, this.props.history);

    }


    render() {
        return (
            <div>
                <NavbarComponent pushLogin={this.props.pushLogin}/>
                <br/>
                <div className={"row"}>

                    <Col md={{span:4, offset: 1}}>
                        <h2>Configure Container Dimensions</h2>
                        <AddForm type={"container"} addItem={this.addItem}/>
                    </Col>
                    <Col md={{span:4, offset: 2}}>
                        <h2>Current Schema</h2>
                        <br/>
                        <RowTable boxes={this.state.boxes} container={this.state.container}  submit={this.submit} type={"container"}/>
                    </Col>
                </div>
            </div>
        );
    }
}

export default Container;