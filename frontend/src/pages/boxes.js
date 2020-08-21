import React, {Component} from 'react';
import NavbarComponent from "../components/navbarComponent";
import VariableTable from "../components/variable_table";
import Scene from "../components/scene";

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
                <div>
                    <Scene/>
                </div>
            </div>
        );
    }
}

export default Boxes;