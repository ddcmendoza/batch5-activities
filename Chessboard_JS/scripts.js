/*
General TODO:
1. Alternating moves [x]
2. Move and Move Checking [x]
3. Piece Checking [done with Pawn, to follow next]
4. Victory Condition - Checkmate and Timer running out [check started]
5. En passant/Castling
6. Timers [x]
7. Pawn promotion
8. *OPTIONAL* - add logging

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
var isChecked = false;

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
        if(i<16){
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
    isChecked = false;

}

//clicking and dropping pieces
/*TO DO:
    1. DO logic for clicking if clickingPiece = true [done]
    2. DO logic for dropping if clickingPiece = false [done]
    3. if clickingPiece = true, the only way to set it to false is to click a valid 'box' which will be checked by checkMove() [done]
    4. if clickingPiece = false, the only way to set it to false is to click a valid 'piece' that can move which will be checked by checkPiece()
*/
function movePieces(r,c){
    let piece = document.getElementsByClassName("box r"+ r +" c" + c );
    let colorToMove = whiteMove? 'white':'black';
    piece[0].style.animation = '';
    if(clickingPiece){
        //check if move is possible
        if(checkMove(r,c,holdingR,holdingC,holdingPiece,holdingPieceColor,piece) && piece[0].style.color != containerPiece.style.color){
            console.log("move valid");
            containerPiece.innerHTML = "";
            containerPiece.style.color = "";
            piece[0].innerHTML = holdingPiece;
            piece[0].style.color = holdingPieceColor;
            isChecked = false;
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
            isCheck(piece[0]);
        }
        else{
            //TO DO Display invalid move
            console.log("invalid move")
        }
        //reset value
        containerPiece.style.animation = '';
        clickingPiece = false;
        holdingPiece = null;
        holdingPieceColor = null;
        containerPiece = null
        holdingR = null;
        holdingC = null;
        console.log("drop piece")
    }

    else if(!clickingPiece){
        //checks if there's a piece and if the piece can move
        if(piece[0].innerHTML != '' && colorToMove == piece[0].style.color && checkPiece(r,c,piece) && ((isChecked && piece[0].innerHTML==KING) || !isChecked)){
            console.log("pick up a piece");
            piece[0].style.animation = "highlight 1.5s infinite";
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
/*Check latest move if it made a check [TODO] */
function isCheck(piece){
    let rank = piece.innerHTML;
    let color = piece.style.color;

}
/*
validate if valid move
will return true if valid
cur = destination, prev = source
will need to refactor later
*/
function checkMove(curR,curC,prevR,prevC,holdPiece,color,piece){
    let multiplier = (color == 'black')? -1:1;
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
            break;
        case ROOK:
            if(curC == prevC) 
            {
                let i = prevR + rdiff/(curR-prevR);
                // check the path if it's being blocked
                while(i != curR){
                    let cPiece = document.getElementsByClassName("box r"+ i +" c" + curC );
                    if (cPiece[0].innerHTML != '') return false;
                    i = i + rdiff/(curR-prevR);
                }
                return true;
            }
            if(curR == prevR){
                let i = prevC + cdiff/(curC-prevC);
                // check the path if it's being blocked
                while(i != curC){
                    const cPiece = document.getElementsByClassName("box r"+ curR +" c" + i );
                    if (cPiece[0].innerHTML != '') return false;
                    i = i + cdiff/(curC-prevC);
                }
                return true;
            }
            break;
        case KNIGHT:
            if(((curR != prevR) && (curC != prevC)) &&(rdiff+cdiff == 3)){
                return true;
            }
            break;
        case BISHOP:
            // see if diagonal
            if ((rdiff/cdiff) == 1){
                let i = prevR + rdiff/(curR-prevR);
                let j = prevC + cdiff/(curC-prevC);
                // check the path if it's being blocked
                while(i != curR && j != curC){
                    const cPiece = document.getElementsByClassName("box r"+ i +" c" + j );
                    if (cPiece[0].innerHTML != '') return false;
                    i = i + rdiff/(curR-prevR);
                    j = j + cdiff/(curC-prevC); 
                }
                return true;
            }
            break;
        case KING:
            if(rdiff <= 1 && cdiff <= 1 && !willBeChecked(curR,curC,color)){
                return true;
            }
            break;
        case QUEEN:
            // combination of rook and bishop checks
            return (checkMove(curR,curC,prevR,prevC,ROOK,color,piece) || checkMove(curR,curC,prevR,prevC,BISHOP,color,piece));
            break;
    }
    return false;
}


/* function for checking if King will be Checked */
function willBeChecked(R,C,color){
    /* for ROOK and QUEEN check */
    for(let i = R - 1; i >= 1; i--){
        const cPiece = document.getElementsByClassName("box r"+ i +" c" + C);
        if (cPiece[0].innerHTML != ''){
            if(cPiece[0].style.color != color && (cPiece[0].innerHTML == ROOK || cPiece[0].innerHTML == QUEEN)) {return true;}
            break;
        }
    }
    for(let i = R + 1; i <= 8; i++){
        const cPiece = document.getElementsByClassName("box r"+ i +" c" + C);
        if (cPiece[0].innerHTML != ''){
            if(cPiece[0].style.color != color && (cPiece[0].innerHTML == ROOK || cPiece[0].innerHTML == QUEEN)) {return true;}
            break;
        }
    }
    for(let i = C - 1; i >= 1; i--){
        const cPiece = document.getElementsByClassName("box r"+ R +" c" + i);
        if (cPiece[0].innerHTML != ''){
            if(cPiece[0].style.color != color && (cPiece[0].innerHTML == ROOK || cPiece[0].innerHTML == QUEEN)) {return true;}
            break;
        }
    }
    for(let i = C + 1; i <= 8; i++){
        const cPiece = document.getElementsByClassName("box r"+ R +" c" + i);
        if (cPiece[0].innerHTML != ''){
            if(cPiece[0].style.color != color && (cPiece[0].innerHTML == ROOK || cPiece[0].innerHTML == QUEEN)) {return true;}
            break;
        }
    }
    /*for BISHOP and QUEEN check */
    for(let i = R - 1, j = C - 1; i >= 1 && j >= 1; i--, j--){
        const cPiece = document.getElementsByClassName("box r"+ i +" c" + j);
        if (cPiece[0].innerHTML != ''){
            if(cPiece[0].style.color != color && (cPiece[0].innerHTML == BISHOP || cPiece[0].innerHTML == QUEEN)) {return true;}
            break;
        }
    }
    for(let i = R - 1, j = C + 1; i >= 1 && j <= 8; i--, j++){
        const cPiece = document.getElementsByClassName("box r"+ i +" c" + j);
        if (cPiece[0].innerHTML != ''){
            if(cPiece[0].style.color != color && (cPiece[0].innerHTML == BISHOP || cPiece[0].innerHTML == QUEEN)) {return true;}
            break;
        }
    }
    for(let i = R + 1, j = C - 1; i <= 8 && j >= 1; i++, j--){
        const cPiece = document.getElementsByClassName("box r"+ i +" c" + j);
        if (cPiece[0].innerHTML != ''){
            if(cPiece[0].style.color != color && (cPiece[0].innerHTML == BISHOP || cPiece[0].innerHTML == QUEEN)) {return true;}
            break;
        }
    }
    for(let i = R + 1, j = C + 1; i <= 8 && j <= 8; i++, j++){
        const cPiece = document.getElementsByClassName("box r"+ i +" c" + j);
        if (cPiece[0].innerHTML != ''){
            if(cPiece[0].style.color != color && (cPiece[0].innerHTML == BISHOP || cPiece[0].innerHTML == QUEEN)) {return true;}
            break;
        }
    }
    /*for KNIGHT check */
    //ad;lkajdlkasdj brute force muna tinatamad ako magisip hahahahaha
    if((R+1) <= 8 && (C+2) <= 8){
        const cPiece1color = document.getElementsByClassName("box r"+ (R+1) +" c" + (C+2))[0].style.color;
        const cPiece1 = document.getElementsByClassName("box r"+ (R+1) +" c" + (C+2))[0].innerHTML;
        if(cPiece1color != color && cPiece1 == KNIGHT) return true;
    }
    if((R+1) <= 8 && (C-2) >= 1){
        const cPiece2color = document.getElementsByClassName("box r"+ (R+1) +" c" + (C-2))[0].style.color;
        const cPiece2 = document.getElementsByClassName("box r"+ (R+1) +" c" + (C-2))[0].innerHTML;
        if(cPiece2color != color && cPiece2 == KNIGHT) return true;
    }
    if((R+2) <= 8 && (C+1) <= 8){
        const cPiece3color = document.getElementsByClassName("box r"+ (R+2) +" c" + (C+1))[0].style.color;
        const cPiece3 = document.getElementsByClassName("box r"+ (R+2) +" c" + (C+1))[0].innerHTML;
        if(cPiece3color != color && cPiece3 == KNIGHT) return true;
    }
    if((R+2) <= 8 && (C-1) >= 1){
        const cPiece4color = document.getElementsByClassName("box r"+ (R+2) +" c" + (C-1))[0].style.color;
        const cPiece4 = document.getElementsByClassName("box r"+ (R+2) +" c" + (C-1))[0].innerHTML;
        if(cPiece4color != color && cPiece4 == KNIGHT) return true;
    }
    if((R-1) >= 1 && (C+2) <= 8){
        const cPiece5color = document.getElementsByClassName("box r"+ (R-1) +" c" + (C+2))[0].style.color;
        const cPiece5 = document.getElementsByClassName("box r"+ (R-1) +" c" + (C+2))[0].innerHTML;
        if(cPiece5color != color && cPiece5 == KNIGHT) return true;
    }
    if((R-1) >= 1 && (C-2) >= 1){
        const cPiece6color = document.getElementsByClassName("box r"+ (R-1) +" c" + (C-2))[0].style.color;
        const cPiece6 = document.getElementsByClassName("box r"+ (R-1) +" c" + (C-2))[0].innerHTML;
        if(cPiece6color != color && cPiece6 == KNIGHT) return true;
    }
    if((R-2) >= 1 && (C+1) <= 8){
        const cPiece7color = document.getElementsByClassName("box r"+ (R-2) +" c" + (C+1))[0].style.color;
        const cPiece7 = document.getElementsByClassName("box r"+ (R-2) +" c" + (C+1))[0].innerHTML;
        if(cPiece7color != color && cPiece7 == KNIGHT) return true;
    }
    if((R-2)>= 1 && (C-1) >= 1){
        const cPiece8color = document.getElementsByClassName("box r"+ (R-2) +" c" + (C-1))[0].style.color;
        const cPiece8 = document.getElementsByClassName("box r"+ (R-2) +" c" + (C-1))[0].innerHTML;
        if(cPiece8color != color && cPiece8 == KNIGHT) return true;
    }
    /*for PAWN check */

    return false;
}
//TO DO: will highlight valid moves, then put valid class to the valid elements
function displayMove(r,c,piece){
    //TO DO
}
//validate if valid piece to move (i.e. not being blocked by allies)
function checkPiece(r,c,piece){
    //TO DO
    const color = piece[0].style.color;
    const multiplier = (color == 'black') ? -1:1;
    switch(piece[0].innerHTML){
        case PAWN:
            const front = document.getElementsByClassName("box r"+ (r-multiplier) +" c" + c );
            const side1 = document.getElementsByClassName("box r"+ (r-multiplier) +" c" + (c+1));
            const side2 = document.getElementsByClassName("box r"+ (r-multiplier) +" c" + (c-1));
            if (front[0].innerHTML != '' && ((side1[0].innerHTML == '' || side1[0].style.color == color) && (side2[0].innerHTML == '' || side2[0].style.color == color))) return false;
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
putChessPieces(); //for testing only