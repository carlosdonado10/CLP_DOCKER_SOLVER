import React, {Component} from 'react';
import {CirclePicker} from "react-color";
import reactCSS from 'reactcss';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            editable: true
        }

        this.handleColorClick = this.handleColorClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.styles = this.styles.bind(this);
    }

    componentDidMount() {
        if(this.props.editable !== undefined){
            this.setState({
                'editable': false
            })
        }
    }

    handleColorClick(){
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    styles(){
        return (
            reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.props.box.color.rgb.r}, ${this.props.box.color.rgb.g}, ${this.props.box.color.rgb.b}, ${this.props.box.color.rgb.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        })

        )
    }

    render() {

        return (
            <div>
                <div style={this.styles().swatch} onClick={this.state.editable? this.handleColorClick : (event => {})}>
                    <div style={this.styles().color}/>
                </div>

                {this.state.displayColorPicker ? <div style={this.styles().popover}>
                    <div style={this.styles().cover} onClick={this.handleClose}/>
                    <CirclePicker color={this.props.box.color} onChange={(color)=>{this.props.handleColorChange(this.props.i, color)}}/>
                </div> : null}

            </div>
        );
    }

}

export default ColorPicker;