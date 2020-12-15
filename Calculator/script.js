var num = null;
var op = null;
const OPERATIONS = ['+','-','/','*','='];

var result = null;
const SCREEN = document.getElementById("screen");
const RESULTSCREEN = document.getElementById("result");
const OPSCREEN = document.getElementById("operation");

function input(text){
    //Will not allow first character to be an operator
    if(SCREEN.value.length == 0 && OPERATIONS.includes(text)){
        text="";
        return;
    }

    //Will not allow to have multiple decimal points
    if (text=="." && SCREEN.value.indexOf(".") != -1 ){
        text="";
        return;
     }

     //Will not allow succeeding operators to be inputted
     if(OPERATIONS.includes(SCREEN.value.charAt(SCREEN.value.length-1))&& OPERATIONS.includes(text)){
         text="";
         return;
     }

     //if operator is chosen assign the operator to op variable
     if(OPERATIONS.includes(text)){
        op = text;
        OPSCREEN.value = op;
        if (result == null){
            result = parseFloat(SCREEN.value);
            RESULTSCREEN.value = result;
            SCREEN.value = '';
        }
        else{
        evaluateEQ();
        }
        return;
     }

    SCREEN.value = SCREEN.value + text;
}

function clearScreen(){
    SCREEN.value= '';
    RESULTSCREEN.value= '';
    result = null;
    op = null;

}

function evaluateEQ(){
    if (SCREEN.value != ''){
        num = parseFloat(SCREEN.value);
    }
    result = eval(result+op+num);
    SCREEN.value = '';
    RESULTSCREEN.value = result;
}