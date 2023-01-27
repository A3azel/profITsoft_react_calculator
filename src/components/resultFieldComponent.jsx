import React, {Component} from 'react';
import {Container, FilledInput} from "@mui/material";

class ResultFieldComponent extends Component {

    filedStyles = {
        width:"100%"
    }
    render() {
        const { result, historyList } = this.props;
        return (
            <Container>
                {historyList.map(
                    item =>
                        <FilledInput
                            inputProps={{style: {fontSize: 30, textAlign:"right"}}}
                            sx={this.filedStyles}
                            value={item}
                            multiline
                        />
                )}
                <FilledInput
                    inputProps={{style: {fontSize: 30, textAlign:"right"}}}
                    sx={this.filedStyles}
                    value={result}
                    multiline
                />
            </Container>
        );
    }
}

export default ResultFieldComponent;