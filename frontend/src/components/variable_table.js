import React, {Component} from 'react';

class VariableTable extends Component {
    constructor() {
        super();
        this.state = {
            num_boxes: 1,
            box_dims: [
                {"id": "", "x": 0, "y": 0, "z": 0, "numBoxes": 1}
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleBoxChange = this.handleBoxChange.bind(this);
        this.handleDimChange = this.handleDimChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleBoxChange(event){
        if(event.target.value !== ""){
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    handleDimChange(event){
        let dims = this.state.box_dims;
        let num_dims = dims.length;

        if(num_dims<this.state.num_boxes){
            for(let i=0; i<this.state.num_boxes-num_dims; i++){
                dims.push({"id": "", "x": 0, "y": 0, "z": 0, "numBoxes": 1})
            }
        }else if(num_dims>this.state.num_boxes){
            dims = dims.slice(0, this.state.num_boxes);
        }

        let cord = event.target.name.split('_');
        dims[cord[1]][cord[0]]=event.target.value;

        this.setState({
            box_dims: dims
        })


    }

    tableRow(index){
        return (
            <tr>
                <th><input type={"text"} placeholder={"0"} name={"id_" + index} onChange={this.handleDimChange}/></th>
                <th><input type={"number"} placeholder={"0"} name={"x_" + index} onChange={this.handleDimChange}/></th>
                <th><input type={"number"} placeholder={"0"} name={"y_" + index} onChange={this.handleDimChange}/></th>
                <th><input type={"number"} placeholder={"0"} name={"z_" + index} onChange={this.handleDimChange}/></th>
                <th><input type={"integer"} placeholder={"1"} name={"numBoxes_" + index} onChange={this.handleDimChange}/></th>
            </tr>
        )
    }

    render() {
        var rows = [];
        let numBoxes = this.state.num_boxes>1 ? this.state.num_boxes:1;
        for(let i=0; i<numBoxes; i++){
            rows.push(this.tableRow(i))
        }

        return (
            <div>
                <table>
                    <tr>
                        <th>Number of boxes</th>
                        <th><input type={"number"} name={"num_boxes"} value={this.state.num_boxes} onChange={this.handleBoxChange}/></th>
                    </tr>
                </table>
                <br/>

                <table>
                    <tr>
                        <th>id</th><th>Length (x)</th><th>Width (y)</th><th>Height (z)</th><th>Number of boxes</th>
                    </tr>
                    {rows}
                </table>

            </div>
        );
    }
}

export default VariableTable;