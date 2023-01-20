import React, {Component} from 'react';
import {Button} from "@mui/material";

class ButtonComponent extends Component {
    buttonStyles={
        height:'90px',
        width:'90px',
        backgroundColor:'#26a69a'
    }
    render() {
        return (
            <div>
                <Button sx={this.buttonStyles}
                        variant="contained"
                        value={this.props.numb}
                        onClick={e => this.props.clickProps(e.target.textContent)}
                >
                    {this.props.numb}
                </Button>
            </div>
        );
    }
}

export default ButtonComponent;