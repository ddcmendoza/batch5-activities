var num1;
var num2;
var op;
var toggle = true;
var result;
const screen = document.getElementById("screen");
const resultscreen = document.getElementById("result");

function input(text){
    if (text=="." && screen.value.indexOf(".") != -1 ){
        text="";
     }
    screen.value = screen.value + text;
}

function operation(text){
    num1 = parseFloat(screen.value);
    resultscreen.value = null;
    screen.value=null;
    op = text;
    resultscreen.value= resultscreen.value + num1 + text;
    toggle = true;
}

function clearScreen(){
    screen.value=null;
    resultscreen.value=null;
    result = null;
}

function compute(){
    
    if(toggle){
    num2 = parseFloat(screen.value);
    resultscreen.value = resultscreen.value + num2;
    
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
        console.log(num1);
        console.log(num2);
        console.log(result);
        num1 = result;
        num2 = num2;
        op = op;
        toggle = true;
        compute();
    }
}