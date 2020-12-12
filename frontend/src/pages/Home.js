import React, {Component} from 'react';
import Axios from 'axios';

import NavbarComponent from "../components/navbarComponent";
import SolutionForm from "../components/SolutionForm";
import Scene from "../components/scene";
import VisualizationForm from "../components/visualizationForm";
import SummaryTable from "../components/summaryTable";

class Home extends Component {
    constructor(props) {
        super(props);
        this.scene = React.createRef()
        this.state = {
            containerVisible: false,
            solution: null,
            boxes: null,
            summary: null,
            iteration: 0,
            maxIteration: 0
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleSolutionChange = this.handleSolutionChange.bind(this);
        this.handleContainerVisible = this.handleContainerVisible.bind(this);
        this.handleIterarion = this.handleIterarion.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/");
    }

    handleSolutionChange(solution) {
        this.setState({
            solution: solution
        })
        this.props.solutionService.getSolutionBoxes(solution.id).then(Axios.spread((...responses) => {
            debugger
            this.setState({
                boxes: responses[0].data,
                container: responses[1].data,
                summary: responses[2].data,
                maxIterations: responses[3].data[0],
                iteration: responses[3].data[0]
            })
            this.scene.current.refresh(this.state.containerVisible, this.state.iteration);
        }))
    }

    handleIterarion(event){
        this.setState({
            iteration: parseInt(event.target.value)
        })
        this.scene.current.refresh(this.state.containerVisible, event.target.value);
    }

    handleContainerVisible(visible){
        this.setState({
            containerVisible: visible
        })

        this.scene.current.refresh(visible, this.state.iteration);

    }

    render() {
        return (
            <div>
                <div>
                    <NavbarComponent pushLogin={this.props.pushLogin}/>
                </div>
                <div className={"row"}
                     style={{height: '100%', width:'100%'}}
                >
                    <div className={"col-md-8"} >
                        <SolutionForm solutionService={this.props.solutionService} handleSolutionChange={this.handleSolutionChange}/>
                        <Scene ref={this.scene} boxes={this.state.boxes} container={this.state.container}/>
                    </div>
                    <div className={"col-md-4"}>
                        <br/>
                        <br/>
                        <h2>Visualization Options</h2>
                        <VisualizationForm containerVisible={this.handleContainerVisible} handleIteration={this.handleIterarion} maxIterations={this.state.maxIterations}/>
                        <h2> Solution Summary</h2>
                        <SummaryTable solutionService={this.props.solutionService} summary={this.state.summary}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;