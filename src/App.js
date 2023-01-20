import './App.css';


import React, {Component} from 'react';
import InputFieldComponent from "./components/inputFieldComponent";
import KeyboardComponent from "./components/keyboardComponent";
import {Paper} from "@mui/material";

class App extends Component {

    paper = {
        position: "relative",
        padding: '20px',
        margin: '5% 34% 5% 34%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor:"#e0e0e0"
    }

    state = {
        result: "0",
        historyList: [],
        operand: "",
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        calcOperands: ["+", "-", "/", "*"]

    }
    clickToButton = buttonValue => {
        if(buttonValue === "="){
            this.calculateExpression();
        }
        else if(buttonValue === "C"){
            this.setState({
                result: "0",
                operand: ""
            });
        }
        else {
            this.checkNumber(buttonValue);
            this.checkOperand(buttonValue);
        }
    }

    checkNumber = (possibleNumber) => {
        if(this.state.numbers.includes(Number(possibleNumber))){
            let strResult = this.state.result.toString();
            let fieldValue;
            /*if((strResult === "0" || this.state.calcOperands.includes(strResult.charAt(strResult.length-1))) && possibleNumber==="0"){
                    fieldValue = strResult;
            }*/
            if(strResult === "0" && possibleNumber==="0"){
                fieldValue = strResult;
            }
            else {
                if(strResult.charAt(0) === "0"){
                    fieldValue = possibleNumber;
                }
                else {
                    fieldValue = strResult + possibleNumber;
                }
            }
            this.setState({
                result: fieldValue
            });
        }
    }

    checkOperand = (possibleOperand) => {
        let strResult = this.state.result.toString();
        let strOperand = this.state.operand.toString();
        if(this.state.calcOperands.includes(possibleOperand)){
            if(strResult === "0"){
                return;
            }
            if(strOperand!=="" && this.state.calcOperands.includes(strResult.charAt(strResult.length-1))){
                this.setState({
                    result: strResult.slice(0, -1) + possibleOperand,
                    operand: possibleOperand
                })
                return;
            }
            if(strOperand!=="" && !this.state.calcOperands.includes(strResult.charAt(strResult.length-1))){
                this.calculateExpression(possibleOperand);
                return;
            }
            this.setState({
                result: strResult + possibleOperand,
                operand: possibleOperand
            });
        }
    }

    calculateExpression = (nextOperand = "") => {
        let [firstNumber, secondNumber] = this.state.result.split(this.state.operand);
        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);
        if(isNaN(firstNumber) || isNaN(secondNumber)){
            return;
        }
        let calcResult;
        switch (this.state.operand){
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
                        operand: "",
                        result: "Error division by zero"
                    });
                    return;
                }
                calcResult = firstNumber / secondNumber;
                break;
            default:
                break;
        }
        this.setState({
            historyList: [...this.state.historyList, this.state.result + "=" + calcResult],
            operand: nextOperand,
            result: calcResult + nextOperand
        });
    }

    render() {
        return (
            <Paper sx={this.paper}>
                <InputFieldComponent result={this.state.result} historyList={this.state.historyList}/>
                <KeyboardComponent clickProps = {this.clickToButton}/>
            </Paper>
        );
    }
}

export default App;

