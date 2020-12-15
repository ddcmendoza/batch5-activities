
//variable initializations
var num = null;
var op = null;
var result = null;

//constant initializations
const OPERATIONS = ['+','-','/','*','=','%']; 
const SCREEN = document.getElementById("screen");
const RESULTSCREEN = document.getElementById("result");
const OPSCREEN = document.getElementById("operation");

function input(text){
    //Will not allow first character to be an operator
    if(SCREEN.value.length == 0 && OPERATIONS.includes(text) && result == null){
        text="";
        return;
    }

    //Will not allow to have multiple decimal points
    if (text=="." && SCREEN.value.indexOf(".") != -1 ){
        text="";
        return;
     }

     /*
     If operator is chosen,
     If result is empty, it means op is empty too, so assign operator in op and display.
     Assign the current inputted text to result and display as result and clear screen.

     If operator is chosen but there is no value yet, allows you to change current operator.
     Otherwise, do calculation based on current op, result, and inputted number.
     */
     if(OPERATIONS.includes(text)){

        if (result == null){
            op = text;
            OPSCREEN.value = op;
            result = parseFloat(SCREEN.value);
            RESULTSCREEN.value = result;
            SCREEN.value = '';
        }
        else if (SCREEN.value ==''){
            op = text;
            OPSCREEN.value = op;
        }
        else{
        evaluateEQ();
        op = text;
        OPSCREEN.value = op;
        }
        return;
     }

    SCREEN.value = SCREEN.value + text;
}

//clear everything
function clearScreen(){
    SCREEN.value = '';
    RESULTSCREEN.value = '';
    OPSCREEN.value = '';
    result = null;
    op = null;

}

//Called by equals or by any operator given that there's a result stored and an inputted value.
function evaluateEQ(){
    if (SCREEN.value != ''){
        num = parseFloat(SCREEN.value);
    }
    result = eval(result+op+num);
    SCREEN.value = '';
    RESULTSCREEN.value = result;
}