import React, {Component} from 'react';

import NavbarComponent from "../components/navbarComponent";
import SolutionForm from "../components/SolutionForm";
import Scene from "../components/scene";
import Axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.scene = React.createRef()
        this.state = {
            solution: null,
            boxes: null,
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleSolutionChange = this.handleSolutionChange.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/");
    }

    handleSolutionChange(solution){
        this.setState({
            solution: solution
        })
        this.props.solutionService.getSolutionBoxes(solution.id).then(Axios.spread((...responses)=> {
            this.setState({
                boxes: responses[0].data,
                container: responses[1].data
            })
            this.scene.current.refresh();
        }))


    }

    render() {
        return (
            <div>
                <div>
                    <NavbarComponent/>
                </div>
                <div className={"Row"}>
                    <div className={"col-md-8"}>
                        <SolutionForm solutionService={this.props.solutionService} handleSolutionChange={this.handleSolutionChange}/>
                        <Scene ref={this.scene} boxes={this.state.boxes} container={this.state.container}/>
                    </div>
                    <div className={"col-md-4"}>

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;