/*
General TODO:
1. Alternating moves [x]
2. Move and Move Checking (Move Done? Checking-collision checking(or blockage))
3. Piece Checking (Started)
4. Victory Condition - Checkmate and Timer running out
5. En passant/Castling
6. Timers [x]
7. Pawn promotion

*/


//assigning chess pieces characters
const PAWN = "♟";
const ROOK = "♜";
const KNIGHT = "♞";
const BISHOP = "♝";
const QUEEN = "♛";
const KING = "♚";

//assigning global variables
var clickingPiece = false;
var holdingPiece = null;
var holdingPieceColor = null;
var containerPiece = null;
var holdingR = null;
var holdingC = null;
var whiteKing;
var blackKing;

//timers and move determination
var whiteInt;
var blackInt;

var wTime = 60*15;
var bTime = 60*15;
var whiteMove = true;

const BOX = document.getElementsByClassName("box");
const WHITETIME = document.getElementsByClassName("timerwhite");
const BLACKTIME = document.getElementsByClassName("timerblack");
const DESC = document.getElementsByClassName("description");

//function for populating the board the default
function putChessPieces() {
    removePieces();
    whiteInt = setInterval(timerWhite, 1000);
    DESC[0].innerHTML = "White Move";
    for(let i = 0; i < BOX.length;i++){
        if((i>7 && i<16)||(i>47 && i<56)){
            BOX[i].innerHTML = PAWN;
            BOX[i].style.color = 'white';
            }
        if(i == 0 || i == 7 || i == 56 || i == 63){
            BOX[i].innerHTML = ROOK;
            BOX[i].style.color = 'white';
        }
        if(i == 1 || i == 6 || i == 57 || i == 62){
            BOX[i].innerHTML = KNIGHT;
            BOX[i].style.color = 'white';
        }
        if(i == 2 || i == 5 || i == 58 || i == 61){
            BOX[i].innerHTML = BISHOP;
            BOX[i].style.color = 'white';
        }
        if(i == 3 || i == 59){
            BOX[i].innerHTML = QUEEN;
            BOX[i].style.color = 'white';
        }
        if(i == 4 || i == 60){
            BOX[i].innerHTML = KING;
            BOX[i].style.color = 'white';
        }
        if(i<17){
            BOX[i].style.color = 'black';
        }
     }
     whiteKing = BOX[60];
     blackKing = BOX[4];
}

//function for clearing the board
function removePieces(){
    for(let i = 0; i < BOX.length;i++){
        BOX[i].innerHTML = "";
        if(i<17 || i == 27){
            BOX[i].style.color = '';
        }
    }
    clearInterval(whiteInt);
    clearInterval(blackInt);
    wTime = 60*15;
    bTime = 60*15;
    whiteMove = true;
    DESC[0].innerHTML = "";
    WHITETIME[0].innerHTML = "White - "+displayTime(wTime);
    BLACKTIME[0].innerHTML = "Black - "+displayTime(bTime);

}

//clicking and dropping pieces
/*TO DO:
    1. DO logic for clicking if clickingPiece = true [done]
    2. DO logic for dropping if clickingPiece = false [done]
    3. if clickingPiece = true, the only way to set it to false is to click a valid 'box' which will be checked by checkMove()
    4. if clickingPiece = false, the only way to set it to false is to click a valid 'piece' that can move which will be checked by checkPiece()
*/
function movePieces(r,c){
    console.log(whiteMove);
    let piece = document.getElementsByClassName("box r"+ r +" c" + c );
    let colorToMove = 'white';
    if(!whiteMove){
        colorToMove = 'black';
    }
    if(clickingPiece){
        //check if move is possible
        if(checkMove(r,c,holdingR,holdingC,holdingPiece,holdingPieceColor,piece) && piece[0].style.color != containerPiece.style.color){
            console.log("move valid");
            containerPiece.innerHTML = "";
            containerPiece.style.color = "";
            piece[0].innerHTML = holdingPiece;
            piece[0].style.color = holdingPieceColor;
            
            if(whiteMove){
                blackInt = setInterval(timerBlack, 1000);
                clearInterval(whiteInt);
                whiteMove = false;
                DESC[0].innerHTML = "Black Move";
            }
            else{
                whiteInt = setInterval(timerWhite, 1000);
                clearInterval(blackInt);
                whiteMove = true;
                DESC[0].innerHTML = "White Move";
            }
        }
        
        else{
            //TO DO Display invalid move
            console.log("invalid move")
        }
        //reset value
        clickingPiece = false;
        holdingPiece = null;
        holdingPieceColor = null;
        containerPiece = null
        holdingR = null;
        holdingC = null;
        console.log("drop piece")
    }

    else if(!clickingPiece){
        console.log("pick up a piece");

        //checks if there's a piece and if the piece can move
        if(piece[0].innerHTML != '' && colorToMove == piece[0].style.color && checkPiece(piece,r,c)){
            holdingPiece = piece[0].innerHTML;
            holdingPieceColor = piece[0].style.color;
            containerPiece = piece[0];
            clickingPiece = true;
            holdingR = r;
            holdingC = c;
            //displayMove(r,c,holdingPiece); for future
        }
    }
}

//validate if valid move
//will return true if valid
//cur = destination, prev = source
//will need to refactor later
function checkMove(curR,curC,prevR,prevC,holdPiece,color,piece){
    let multiplier = 1;
    if(color == 'black') { multiplier = -1;}
    const curPiece = piece[0].innerHTML;
    const rdiff = Math.abs(prevR-curR);
    const cdiff = Math.abs(prevC-curC);
    switch(holdPiece){
        case PAWN:
            // lol definitely will change later, but good for now 12/20/2020
            // when not in the starting square
            if((curR+(multiplier*1))*multiplier < (prevR)*multiplier && !(prevR ==7 || prevR ==2)){
                return false;
            }
            // when capturing
            if(curPiece != ''){
                if(curR == prevR - 1*multiplier && (curC == prevC + 1 || curC == prevC-1)){
                    return true;
                }
                else{
                    return false;
                }
            }
            // if going to empty space
            if(curPiece == ''){
                if((curR+(multiplier*2))*multiplier < (prevR)*multiplier){
                    return false;
                }
                if(curC != prevC){
                    return false;
                }
                else{
                    return true;
                }
            }
        case ROOK:
            if(curC == prevC || curR == prevR){
                return true;
            }
        case KNIGHT:
            if(((curR != prevR)&&(curC != prevC)) &&((rdiff)+(cdiff) == 3))
            {
                return true;
            }

        case BISHOP:
            if ((rdiff/cdiff) == 1){
                return true;
            }
        case KING:
            if(rdiff <= 1 && cdiff <= 1){
                return true;
            }
        case QUEEN:
            if(curC == prevC || curR == prevR){
                return true;
            }
            if ((rdiff/cdiff) == 1){
                return true;
            }
    }
    return false;
}
//TO DO: will highlight valid moves, then put valid class to the valid elements
function displayMove(r,c,piece){
    //TO DO
}
//validate if valid piece to move (i.e. not being blocked by allies)
function checkPiece(piece,r,c){
    //TO DO
    switch(piece[0].innerHTML){
        case PAWN:
        case ROOK:
        case KNIGHT:
        case BISHOP:
        case KING:
        case QUEEN:
    }
    return true;
}

//timers
function timerWhite(){

    wTime = wTime - 1;
    WHITETIME[0].innerHTML = "White - "+displayTime(wTime);
}
function timerBlack(){
    bTime = bTime - 1;
    BLACKTIME[0].innerHTML = "Black - "+displayTime(bTime);
}

function displayTime(time){
    return (Math.floor(time/60)) + ":" + ("0"+(time%60)).slice(-2);
}

//will return the row of the box
function getR(box){
    return box.className[5];
}

//will return the column of the box
function getC(box){
    return box.className[8];
}
putChessPieces(); //for testing only