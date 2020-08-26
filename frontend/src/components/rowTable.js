import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";

class RowTable extends Component {
    constructor(props) {
        super(props);

        this.renderRows = this.renderRows.bind(this);
    }

    renderRows(row, i){
        return(
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
            </tr>
        )
    }

    render() {
        let rows = [];
        for(let i=0; i<this.props.boxes.length; i++){
            rows.push(this.renderRows(this.props.boxes[i], i))
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
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                <Form>
                    <Button onClick={this.props.submit}> Submit</Button>
                </Form>
            </div>
        );
    }
}

export default RowTable;