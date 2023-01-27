import React, {Component} from 'react';
import {Button} from "@mui/material";

class ButtonComponent extends Component {
    buttonStyles={
        height:'90px',
        width:'90px',
        backgroundColor:'#26a69a',
        fontSize: '30px'
    }
    render() {
        const {
            numb,
            clickProps
        } = this.props;

        return (
            <div>
                <Button sx={this.buttonStyles}
                        variant="contained"
                        value={numb}
                        onClick={e => clickProps(e.target.textContent)}
                >
                    {numb}
                </Button>
            </div>
        );
    }
}

export default ButtonComponent;