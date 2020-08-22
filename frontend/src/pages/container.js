import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';

import AddForm from "../components/addForm";
import RowTable from "../components/rowTable";


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
            boxes: JSON.parse(localStorage.getItem('boxes'))
        })
    }

    componentWillUnmount() {
        localStorage.removeItem('boxes')
    }

    addItem(container){
        let tempBoxes = Object.assign(this.state.boxes, {});
        if(this.state.addedContainer) {
            tempBoxes[tempBoxes.length - 1] = container
        }else{
            tempBoxes.push(container)
        }

        this.setState({
                [container['x']]: container.x,
                [container['y']]: container.y,
                [container['z']]: container.z,
                boxes: tempBoxes
            }
        )
    }

    submit(){
        this.props.history.push('/dashboard')
    }


    render() {
        return (
            <div>
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