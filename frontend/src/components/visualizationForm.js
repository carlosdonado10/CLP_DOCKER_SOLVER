import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';

class VisualizationForm extends Component {
    constructor() {
        super();
        this.state = {
            iteration: 0
        }
        this.handleVisualizeContainer = this.handleVisualizeContainer.bind(this);
    }

    handleVisualizeContainer(event){
        this.props.containerVisible(event.target.checked);
    }

    render() {
        return (
                <Form>
                    <Form.Group controlId="ToggleContainer">
                        <Form.Check
                            type='switch'
                            id='switch'
                            label='View Container'
                            onChange={this.handleVisualizeContainer}
                        />
                    </Form.Group>

                    <Form.Group controlId='ieration-slider'>
                        <Form.Label>Step by step loading</Form.Label><br/>
                        <RangeSlider
                        min={0}
                        max={this.props.maxIterations}
                        tooltip={'on'}
                        onChange={this.props.handleIteration}
                        />
                    </Form.Group>
                </Form>
        );
    }
}

export default VisualizationForm;