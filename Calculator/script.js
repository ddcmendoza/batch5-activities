var num1;
var num2;
var op;
var toggle = true;
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
    screen.value=null;
    op = text;
    console.log(num1);
    resultscreen.value= resultscreen.value + num1 + text;
    toggle = true;
}

function clearScreen(){
    screen.value=null;
    resultscreen.value=null;
}

function compute(){
    if(toggle){
    num2 = parseFloat(screen.value);
    resultscreen.value = resultscreen.value + num2;
    console.log(num2);
    var result;
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

    console.log(result);
    resultscreen.value = result;
    num1 = null;
    num2 = null;
    toggle = false;
    }
    else{
        clearScreen();
        toggle = true;
    }
}