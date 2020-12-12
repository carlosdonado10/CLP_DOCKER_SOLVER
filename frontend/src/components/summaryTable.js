import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import ColorPicker from "./colorPicker";

class SummaryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxes: "",
        }
    }

    renderRow(row, i){
        return (
            <tr>
                <th>
                    {row.name}
                </th>
                <th>
                    {row.allocated}
                </th>
                <th>
                    {row.requested}
                </th>
                <th>
                    <ColorPicker box={row} i={i} editable={false}/>
                </th>
            </tr>
        )
    }

    render() {
        let rows = [];
        if(this.props.summary !== null){
            for(let i=0; i<this.props.summary.length; i++){
                rows.push(this.renderRow(this.props.summary[i], i))
            }
        }


        return (
            <Table bordered>
                <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Number allocated
                    </th>
                    <th>
                        Number Requested
                    </th>
                    <th>
                        Color
                    </th>

                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        );
    }
}

export default SummaryTable;