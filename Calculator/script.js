var num1;
var num2 = null;
var op;
var toggle = true;
var result = null;
const screen = document.getElementById("screen");
const resultscreen = document.getElementById("result");

function input(text){
    if (text=="." && screen.value.indexOf(".") != -1 ){
        text="";
     }
    screen.value = screen.value + text;
}

function operation(text){
    let num = parseFloat(screen.value);
    screen.value=null;
    op = text;
    if (result === null && resultscreen.value == ""){
        
        num1 = num;
        resultscreen.value= resultscreen.value + num1 + op;
        toggle = true;
    }
    else{
        num2 = null;
        if(!isNaN(num)){ 
            num2 = num;
            toggle = false;
            compute();
        }
    }
    
}

function clearScreen(){
    screen.value=null;
    resultscreen.value=null;
    result = null;
    num2 = null;
}

function compute(){
    if(toggle){
    if(num2 === null){ num2 = parseFloat(screen.value);}
    screen.value = null;
    switch(op){
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "/":
            result = num1/num2;
            break;
        case "*":
            result = num1*num2;
            break;
        default:
            clearScreen();
    }
    resultscreen.value = result;
    toggle = false;
    }
    else{
        if (result != null){ num1 = result;}
        num2 = num2;
        op = op;
        toggle = true;
        compute();
    }
}