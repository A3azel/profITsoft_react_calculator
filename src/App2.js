import './App.css';


import React, {Component} from 'react';
import {Paper} from "@mui/material";
import ResultFieldComponent from "./components/resultFieldComponent";
import KeyboardComponent from "./components/keyboardComponent";


const styles = () => ({
    paperStyles:{
        position: "relative",
        padding: '20px',
        margin: '5% 34% 5% 34%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor:"#e0e0e0"
    }
});
class App2 extends Component {

    state = {
        result: "0",
        historyList: [],
        isSecondNumber: false,
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        calcOperands: ["+", "-", "/", "*"],
        defaultExpressions:[]
    }
    clickToButton = buttonValue => {
        if(buttonValue === "="){
            this.calculateExpression();
        }
        else if(buttonValue === "C"){
            if(this.state.result==="0"){
                this.setState({
                    historyList: [],
                });
            }
            this.setState({
                result: "0",
                isSecondNumber: false
            });
        }
        else {
            this.checkNumber(buttonValue);
            this.checkOperand(buttonValue);
        }
    }

    checkNumber = (possibleNumber) => {
        if(this.state.numbers.includes(Number(possibleNumber))){
            let checkNumber = this.state.result;
            let isSecondNumber = this.state.isSecondNumber;

            if(isSecondNumber){
                let secondNumber = "";
                try{
                    secondNumber = this.state.result.match(/(^-?\d+\.?\d*)([/+*-])(\d+\.?\d*)/)[3];
                }catch (e){

                }
                if(secondNumber === "" && possibleNumber === "0"){
                    this.setState({
                        result: this.state.result + possibleNumber
                    });
                    return;
                }
                if(secondNumber.charAt(0) ==="0"){
                    this.setState({
                        result: this.state.result.slice(0, -1) + possibleNumber
                    });
                    return;
                }
            }else {
                if(checkNumber === "0" && possibleNumber === "0"){
                    return;
                }
                if (checkNumber.charAt(0) === "0") {
                    this.setState({
                        result: this.state.result.slice(0, -1) + possibleNumber
                    });
                    return;
                }
            }

            this.setState({
                result: this.state.result + possibleNumber
            });
        }
    }

    checkOperand = (possibleOperand) => {
        let strResult = this.state.result.toString();
        let isSecondNumber = this.state.isSecondNumber;

        if(this.state.calcOperands.includes(possibleOperand)){
            if(isSecondNumber && this.state.calcOperands.includes(strResult.charAt(strResult.length-1))){
                this.setState({
                    result: strResult.slice(0, -1) + possibleOperand,
                })
                return;
            }
            if(isSecondNumber && !this.state.calcOperands.includes(strResult.charAt(strResult.length-1))){
                this.calculateExpression(possibleOperand);
                return;
            }
            this.setState({
                result: strResult + possibleOperand,
                isSecondNumber: true
            });
        }
    }
    calculateExpression = (nextOperand = "") => {
        let result = this.state.result.match(/(^-?\d+\.?\d*)([/+*-])(\d+\.?\d*)/);
        let firstNumber;
        let operand;
        let secondNumber;
        try{
            firstNumber = result[1];
            operand = result[2];
            secondNumber = result[3];
        }catch (e){
            return;
        }

        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);
        let calcResult;
        switch (operand){
            case "+":
                calcResult = firstNumber + secondNumber;
                break;
            case "-":
                calcResult = firstNumber - secondNumber;
                break;
            case "*":
                calcResult = firstNumber * secondNumber;
                break;
            case "/":
                if(secondNumber===0){
                    this.setState({
                        historyList: [...this.state.historyList, this.state.result + "=Error division by zero"],
                        isSecondNumber: false,
                        result: "0"
                    });
                    return;
                }
                calcResult = firstNumber / secondNumber;
                break;
            default:
                break;
        }
        calcResult = Number(calcResult).toFixed(0);
        this.setState({
            historyList: [...this.state.historyList, this.state.result + "=" + calcResult],
            result: calcResult + nextOperand,
            isSecondNumber: nextOperand!==""
        });
    }

    getAndCalculateDefaultExpression = () => {
        fetch('localhost:8080/math/expamples?count=5')
            .then((response) => {
                this.setState({defaultExpressions: [response.data]})
            });
        this.state.defaultExpressions.forEach(
            x =>
            {
                this.setState({result: x});
                this.calculateExpression();
            })
        this.setState({
            result: "0",
        });
    }

    render() {

        const {
            result,
            historyList
        } = this.state;

        return (
            <Paper>
                <ResultFieldComponent result={result} historyList={historyList}/>
                <KeyboardComponent clickProps = {this.clickToButton}/>
            </Paper>
        );
    }
}

export default App2;

