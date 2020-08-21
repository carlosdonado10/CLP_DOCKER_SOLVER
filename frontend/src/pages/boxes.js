import React, {Component} from 'react';
import NavbarComponent from "../components/navbarComponent";
import VariableTable from "../components/variable_table";

class Boxes extends Component {
    render() {
        return (
            <div>
                <div>
                    <NavbarComponent/>
                </div>

                <div>
                    <VariableTable/>
                </div>
            </div>
        );
    }
}

export default Boxes;