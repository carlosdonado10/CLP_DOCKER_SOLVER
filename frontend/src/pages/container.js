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
        this.props.optimizerService.optimize(this.state.boxes, this.state.container);
        this.props.history.push('/')
    }


    render() {
        return (
            <div>
                <NavbarComponent/>
                <div className={"row"}>

                    <Col md={5}>
                        <AddForm type={"container"} addItem={this.addItem}/>
                    </Col>
                    <Col md={{span:4, offset: 3}}>
                        <RowTable boxes={this.state.boxes}  submit={this.submit}/>
                    </Col>
                </div>
            </div>
        );
    }
}

export default Container;