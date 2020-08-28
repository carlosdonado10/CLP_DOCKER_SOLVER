import React, {Component} from 'react';

import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import ColorPicker from "./colorPicker";

class RowTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
        }
        this.renderRows = this.renderRows.bind(this);
    }

    renderRows(row, i, picker) {
        return (
            <tr key={i}>
                <th>
                    {row.id}
                </th>
                <th>
                    {row.x}
                </th>
                <th>
                    {row.y}
                </th>
                <th>
                    {row.z}
                </th>
                <th>
                    {row.numBoxes}
                </th>
                <th>
                    {this.props.type ==="box" ? <ColorPicker box={this.props.boxes[i]} i={i} handleColorChange={this.props.handleColorChange}/>: null}
                </th>
            </tr>
        )
    }



    render() {

        let rows = [];
        for(let i=0; i<this.props.boxes.length; i++){
            rows.push(this.renderRows(this.props.boxes[i], i))
        }

        let container =[];
        if(this.props.container !== undefined) {
            if (this.props.container.x !== "") {
                container.push(this.renderRows(this.props.container, this.props.boxes.length))
            }
        }



        return (

            <div>
                <Table striped bordered hover size="md">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Length (x)</th>
                        <th>Width (y)</th>
                        <th>Height (z)</th>
                        <th>Number of Boxes</th>
                        <th>Color</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                    <tfoot>
                    {container}
                    </tfoot>
                </Table>
                <Form>
                    <Button onClick={this.props.submit}> Submit</Button>
                </Form>

            </div>
        );
    }
}

export default RowTable;