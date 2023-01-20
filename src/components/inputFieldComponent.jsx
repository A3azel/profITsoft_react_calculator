import React, {Component} from 'react';
import {FilledInput, Typography} from "@mui/material";

class InputFieldComponent extends Component {

    filedStyles = {
        width:"90%",
        height:"70px"
    }
    render() {
        let { result, historyList } = this.props;
        return (
            /*<FilledInput inputProps={{style: {fontSize: 30}}} sx={this.filedStyles} value={result}/>*/
            <div style={{width:"87%", height:"50px", backgroundColor:"white"}}>
                {historyList.map(
                    (item, index) =>
                        <Typography key={index}>{item}</Typography>
                )}
                <p style={{textAlign:"right"}}>{result}</p>
            </div>
        );
    }
}

export default InputFieldComponent;