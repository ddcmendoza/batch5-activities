/*
General TODO:
1. Alternating moves [x]
2. Move and Move Checking [x]
3. Piece Checking [x]
4. Victory Condition - Checkmate and Timer running out [check started][timer Check done]
    Tasks:
    -finish isCheck() function [done]
    -checkPiece() function update when isChecked
    -make a function to count available piece for movement [done]
5. En passant [x] /Castling [x]
6. Timers [x]
7. Pawn promotion [x]
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
var isChecked = false;
var enPassantAvailable = false;
var roundsEnPassant;
var castlingAvailable = [true, true, true ,true]; // [WL, WR, BL, BR] == [WhiteLeft, WhiteRight, BlackLeft, BlackRight]

var whiteVictory = false;
var blackVictory = false;
var staleMate = false;
var whiteKing = [8,5]; //white king Position
var blackKing = [1,5]; //Black King Position
var checker = null;

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

function getBox(r,c){
    return document.getElementsByClassName("box r"+ r +" c" + c );
}
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
}
// function for clearing id of box
function clearID(forEnPassant = true){
    for(let i = 0; i < BOX.length;i++){
        if(forEnPassant){
            BOX[i].id = '';
        }
        else{
            if(BOX[i].id != 'enPassant') BOX[i].id = '';
        }
        
    }

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
    whiteKing = [8,5];
    blackKing = [1,5];
    checker = null;
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
    4. if clickingPiece = false, the only way to set it to false is to click a valid 'piece' that can move which will be checked by checkPiece() [done]
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
            // Pawn Promotion 
            if(whiteMove){
                if(piece[0].innerHTML == PAWN && r == 1){
                    let promotion = prompt("Q - Queen, K - Knight, R - Rook, B - Bishop");
                    switch(promotion){
                        case 'Q':
                            piece[0].innerHTML = QUEEN;
                            break;
                        case 'K':
                            piece[0].innerHTML = KNIGHT;
                            break;
                        case 'R':
                            piece[0].innerHTML = ROOK;
                            break;
                        case 'B':
                            piece[0].innerHTML = BISHOP;
                            break;
                    }
                }
            }
            else{
                if(piece[0].innerHTML == PAWN && r == 8){
                    let promotion = prompt("Q - Queen, K - Knight, R - Rook, B - Bishop");
                    switch(promotion){
                        case 'Q':
                            piece[0].innerHTML = QUEEN;
                            break;
                        case 'K':
                            piece[0].innerHTML = KNIGHT;
                            break;
                        case 'R':
                            piece[0].innerHTML = ROOK;
                            break;
                        case 'B':
                            piece[0].innerHTML = BISHOP;
                            break;
                    }
                }
            }

            // En Passant
            if(enPassantAvailable){
                if (roundsEnPassant == 1){
                    roundsEnPassant = 0;
                }
                else {
                    enPassantAvailable = false;
                    clearID();
                }
            }
            /* Victory Checking
            Logic: 
                Checkmate:
                -if isCheck() && whiteMove && !stillCanMove()  => Black Wins -> moved to movePieces()
                -if isCheck() && !whiteMove && !stillCanMove() => White Wins -> moved to movePieces()
                -if !isCheck() && !stillCanMove() => Stalemate -> moved to movePieces()
            */
            if(whiteMove){
                blackInt = setInterval(timerBlack, 1000);
                clearInterval(whiteInt);
                whiteMove = false;
            }
            else{
                whiteInt = setInterval(timerWhite, 1000);
                clearInterval(blackInt);
                whiteMove = true;
            }
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
        clearID(false);
        if(!isChecked) checker = piece;
        if(!whiteMove){
            if(isCheck(piece[0].innerHTML,r,c,piece[0].style.color)){
                DESC[0].innerHTML = "Black Move - Check";
                isChecked = true;
                let box = getBox(blackKing[0], blackKing[1])[0];
                box.id = 'checked';
                if (!stillCanMove()){
                    alert('White Victory!');
                    putChessPieces();
                }
            }
            else{
                DESC[0].innerHTML = "Black Move";
                if(!stillCanMove()){
                    alert("Stalemate!");
                    putChessPieces();
                }
            }
        }
        else{
            if(isCheck(piece[0].innerHTML,r,c,piece[0].style.color)){
                DESC[0].innerHTML = "White Move - Check";
                isChecked = true;
                let box = getBox(whiteKing[0], whiteKing[1])[0];
                box.id = 'checked';
                if(!stillCanMove()){
                    alert('Black Victory!');
                    putChessPieces();
                }
            }
            else{
                DESC[0].innerHTML = "White Move";
                if(!stillCanMove()){
                    alert("Stalemate!");
                    putChessPieces();
                }
            }

        }
    }

    else if(!clickingPiece){
        //checks if there's a piece and if the piece can move
        if(piece[0].innerHTML != '' && colorToMove == piece[0].style.color && checkPiece(r,c,piece[0].innerHTML,piece[0].style.color) ){
            //&& ((isChecked && piece[0].innerHTML==KING) || !isChecked) <= wrong logic should also check if a piece can move such that it can remove the check
            console.log("pick up a piece");
            piece[0].style.animation = "highlight 1.5s infinite";
            holdingPiece = piece[0].innerHTML;
            holdingPieceColor = piece[0].style.color;
            containerPiece = piece[0];
            clickingPiece = true;
            holdingR = r;
            holdingC = c;
            displayMove(r,c,holdingPiece,colorToMove); 
        }
    }
}
/*Check latest move if it made a check [TODO] required for victory condition functions opposite to willBeChecked(), will refactor later*/
function isCheck(rank,R,C,color){
    switch(rank){
        case PAWN:
            if (whiteMove){
                //if white needs to be careful on pawn in front (i.e. row is lower)
                if(R-1 >= 1 && C-1 >= 1){
                    const cPiece1 = document.getElementsByClassName("box r"+ (R-1) +" c" + (C-1));
                    if(cPiece1[0].style.color != color && cPiece1[0].innerHTML == KING) {return true;}
                }
                if(R-1 >= 1 && C+1 <= 8){
                    const cPiece2 = document.getElementsByClassName("box r"+ (R-1) +" c" + (C+1));
                    if(cPiece2[0].style.color != color && cPiece2[0].innerHTML == KING) {return true;}
                }
            }
            else{
                //if black needs to be careful on pawn in back (i.e. row is higher)
                if(R-1 >= 1 && C-1 >= 1){
                    const cPiece1 = document.getElementsByClassName("box r"+ (R+1) +" c" + (C-1));
                    if(cPiece1[0].style.color != color && cPiece1[0].innerHTML == KING) {return true;}
                }
                if(R-1 >= 1 && C+1 <= 8){
                    const cPiece2 = document.getElementsByClassName("box r"+ (R+1) +" c" + (C+1));
                    if(cPiece2[0].style.color != color && cPiece2[0].innerHTML == KING) {return true;}
                }
            }
            break;
        case ROOK:
        for(let i = R - 1; i >= 1; i--){
            const cPiece = document.getElementsByClassName("box r"+ i +" c" + C);
            if (cPiece[0].innerHTML != ''){
                if(cPiece[0].style.color != color && cPiece[0].innerHTML == KING) {return true;}
                break;
            }
        }
        for(let i = R + 1; i <= 8; i++){
            const cPiece = document.getElementsByClassName("box r"+ i +" c" + C);
            if (cPiece[0].innerHTML != ''){
                if(cPiece[0].style.color != color && cPiece[0].innerHTML == KING) {return true;}
                break;
            }
        }
        for(let i = C - 1; i >= 1; i--){
            const cPiece = document.getElementsByClassName("box r"+ R +" c" + i);
            if (cPiece[0].innerHTML != ''){
                if(cPiece[0].style.color != color && cPiece[0].innerHTML == KING) {return true;}
                break;
            }
        }
        for(let i = C + 1; i <= 8; i++){
            const cPiece = document.getElementsByClassName("box r"+ R +" c" + i);
            if (cPiece[0].innerHTML != ''){
                if(cPiece[0].style.color != color && cPiece[0].innerHTML == KING) {return true;}
                break;
            }
        }
        break;
        case KNIGHT:
            if((R+1) <= 8 && (C+2) <= 8){
                const cPiece1color = document.getElementsByClassName("box r"+ (R+1) +" c" + (C+2))[0].style.color;
                const cPiece1 = document.getElementsByClassName("box r"+ (R+1) +" c" + (C+2))[0].innerHTML;
                if(cPiece1color != color && cPiece1 == KING) return true;
            }
            if((R+1) <= 8 && (C-2) >= 1){
                const cPiece2color = document.getElementsByClassName("box r"+ (R+1) +" c" + (C-2))[0].style.color;
                const cPiece2 = document.getElementsByClassName("box r"+ (R+1) +" c" + (C-2))[0].innerHTML;
                if(cPiece2color != color && cPiece2 == KING) return true;
            }
            if((R+2) <= 8 && (C+1) <= 8){
                const cPiece3color = document.getElementsByClassName("box r"+ (R+2) +" c" + (C+1))[0].style.color;
                const cPiece3 = document.getElementsByClassName("box r"+ (R+2) +" c" + (C+1))[0].innerHTML;
                if(cPiece3color != color && cPiece3 == KING) return true;
            }
            if((R+2) <= 8 && (C-1) >= 1){
                const cPiece4color = document.getElementsByClassName("box r"+ (R+2) +" c" + (C-1))[0].style.color;
                const cPiece4 = document.getElementsByClassName("box r"+ (R+2) +" c" + (C-1))[0].innerHTML;
                if(cPiece4color != color && cPiece4 == KING) return true;
            }
            if((R-1) >= 1 && (C+2) <= 8){
                const cPiece5color = document.getElementsByClassName("box r"+ (R-1) +" c" + (C+2))[0].style.color;
                const cPiece5 = document.getElementsByClassName("box r"+ (R-1) +" c" + (C+2))[0].innerHTML;
                if(cPiece5color != color && cPiece5 == KING) return true;
            }
            if((R-1) >= 1 && (C-2) >= 1){
                const cPiece6color = document.getElementsByClassName("box r"+ (R-1) +" c" + (C-2))[0].style.color;
                const cPiece6 = document.getElementsByClassName("box r"+ (R-1) +" c" + (C-2))[0].innerHTML;
                if(cPiece6color != color && cPiece6 == KING) return true;
            }
            if((R-2) >= 1 && (C+1) <= 8){
                const cPiece7color = document.getElementsByClassName("box r"+ (R-2) +" c" + (C+1))[0].style.color;
                const cPiece7 = document.getElementsByClassName("box r"+ (R-2) +" c" + (C+1))[0].innerHTML;
                if(cPiece7color != color && cPiece7 == KING) return true;
            }
            if((R-2)>= 1 && (C-1) >= 1){
                const cPiece8color = document.getElementsByClassName("box r"+ (R-2) +" c" + (C-1))[0].style.color;
                const cPiece8 = document.getElementsByClassName("box r"+ (R-2) +" c" + (C-1))[0].innerHTML;
                if(cPiece8color != color && cPiece8 == KING) return true;
            }
            break;
        case BISHOP:
            for(let i = R - 1, j = C - 1; i >= 1 && j >= 1; i--, j--){
                const cPiece = document.getElementsByClassName("box r"+ i +" c" + j);
                if (cPiece[0].innerHTML != ''){
                    if(cPiece[0].style.color != color && cPiece[0].innerHTML == KING) {return true;}
                    break;
                }
            }
            for(let i = R - 1, j = C + 1; i >= 1 && j <= 8; i--, j++){
                const cPiece = document.getElementsByClassName("box r"+ i +" c" + j);
                if (cPiece[0].innerHTML != ''){
                    if(cPiece[0].style.color != color && cPiece[0].innerHTML == KING) {return true;}
                    break;
                }
            }
            for(let i = R + 1, j = C - 1; i <= 8 && j >= 1; i++, j--){
                const cPiece = document.getElementsByClassName("box r"+ i +" c" + j);
                if (cPiece[0].innerHTML != ''){
                    if(cPiece[0].style.color != color && cPiece[0].innerHTML == KING) {return true;}
                    break;
                }
            }
            for(let i = R + 1, j = C + 1; i <= 8 && j <= 8; i++, j++){
                const cPiece = document.getElementsByClassName("box r"+ i +" c" + j);
                if (cPiece[0].innerHTML != ''){
                    if(cPiece[0].style.color != color && cPiece[0].innerHTML == KING) {return true;}
                    break;
                }
            }
            break;
        case QUEEN:
            return (isCheck(ROOK,R,C,color) || isCheck(BISHOP,R,C,color));
    }
    return false;
}

/* Timer Victory */
function checkVictory(){
    if (wTime <= 0){
        alert('Black Victory!');
        putChessPieces();

    }
    else if (bTime <= 0){
        alert('White Victory!');
        putChessPieces();
    }

}

/* Will check if there are still available moves */
function stillCanMove(){
    let container = [];
    if(whiteMove){
        for(let i = 0; i < BOX.length;i++){
            if(BOX[i].style.color == 'white') container.push(BOX[i]);
        }
    }
    else{
        for(let i = 0; i < BOX.length;i++){
            if(BOX[i].style.color == 'black') container.push(BOX[i]);
        }
    }
    for(let i = 0; i < container.length; i++){
        let r = container[i].className[5];
        let c = container[i].className[8];
        if(checkPiece(r,c,container[i].innerHTML,container[i].style.color)){
            return true;
        }
    }

    return false;

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
    if(isChecked && holdPiece != KING){
        let dangerR,dangerC;
    // identify where the king and aggressor is
        if(whiteMove){
            dangerR = whiteKing[0];
            dangerC = whiteKing[1];
        }
        else{
            dangerR = blackKing[0];
            dangerC = blackKing[1];
        }

        let aggresorR = checker[0].className[5];
        let aggresorC = checker[0].className[8];
        let path = [[aggresorR,aggresorC]]; //path from aggresor to checked king

        let rd = aggresorR - dangerR;
        let cd = aggresorC - dangerC;
        let i = aggresorR - rd/Math.abs(rd);
        let j = aggresorC - cd/Math.abs(cd);
        while (i != dangerR && j != dangerC){
            if (getBox(aggresorR,aggresorC)[0].innerHTML == KNIGHT || getBox(aggresorR,aggresorC)[0].innerHTML == PAWN) break; // aggressor is pawn or knight path is only to capture
            path.push([i,j]);
            i = i - rd/Math.abs(rd);
            j = j - cd/Math.abs(cd);
        }
        if(!isIn([curR,curC],path)) return false;

    }
    switch(holdPiece){
        case PAWN:
            // lol definitely will change later, but good for now 12/20/2020
            // En Passant condition
            if (enPassantAvailable){
                    let cPiece = document.getElementsByClassName("box r"+ (prevR) +" c" + (curC))
                    if (curPiece == '' && cPiece[0].id == 'enPassant' && (curR == 3|| curR==6)){
                        cPiece[0].id = '';
                        cPiece[0].innerHTML = '';
                        cPiece[0].style.color = '';
                        return true;
                    }
            }
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
                if (Math.abs(curR-prevR) == 2) {
                    if(enPassantAvailable){
                        clearID();
                    }
                    console.log('en passant available');
                    piece[0].id = 'enPassant';
                    enPassantAvailable = true;
                    roundsEnPassant = 1;
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
                let i;
                if(rdiff != 0)  i = prevR + rdiff/(curR-prevR);
                else i = prevR;
                // check the path if it's being blocked
                while(i != curR){
                    let cPiece = document.getElementsByClassName("box r"+ i +" c" + curC );
                    if (cPiece[0].innerHTML != '') return false;
                    i = i + rdiff/(curR-prevR);
                }
                if(whiteMove){
                    if(prevC == 1){
                        castlingAvailable[0] = false;
                    }
                    if(prevC == 8){
                        castlingAvailable[1] = false;
                    }
                }
                else{
                    if(prevC == 1){
                        castlingAvailable[2] = false;
                    }
                    if(prevC == 8){
                        castlingAvailable[3] = false;
                    }
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
                if(whiteMove){
                    if(prevC == 1){
                        castlingAvailable[0] = false;
                    }
                    if(prevC == 8){
                        castlingAvailable[1] = false;
                    }
                }
                else{
                    if(prevC == 1){
                        castlingAvailable[2] = false;
                    }
                    if(prevC == 8){
                        castlingAvailable[3] = false;
                    }
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
            // will refactor castling later
            if (prevC - curC == 2 && prevR == curR && !isChecked && !willBeChecked(curR,2,color) && !willBeChecked(curR,3,color) && !willBeChecked(curR,4,color)){
                // left castling
                let bet1 = document.getElementsByClassName("box r"+ curR +" c" + 2);
                let bet2 = document.getElementsByClassName("box r"+ curR +" c" + 3);
                let bet3 = document.getElementsByClassName("box r"+ curR +" c" + 4);
                if (bet1[0].innerHTML != '') return false;
                if (bet2[0].innerHTML != '') return false;
                if (bet3[0].innerHTML != '') return false;
                let rook = document.getElementsByClassName("box r"+ curR +" c" + 1);
                let des = document.getElementsByClassName("box r"+ curR +" c" + 4);
                if (whiteMove){
                    let res = castlingAvailable[0];
                    castlingAvailable[0] = false;
                    castlingAvailable[1] = false;
                    if(res){
                        des[0].innerHTML = rook[0].innerHTML;
                        des[0].style.color = rook[0].style.color;
                        rook[0].innerHTML = '';
                        rook[0].style.color = '';
                        whiteKing = [curR, curC];
                    }
                    return res;
                }
                else{
                    let res = castlingAvailable[2];
                    castlingAvailable[3] = false;
                    castlingAvailable[2] = false;
                    if(res){
                        des[0].innerHTML = rook[0].innerHTML;
                        des[0].style.color = rook[0].style.color;
                        rook[0].innerHTML = '';
                        rook[0].style.color = '';
                        blackKing = [curR, curC];
                    }
                    return res;
                }
            }
            else if(prevC - curC == -2 && prevR == curR && !isChecked && !willBeChecked(curR, 6, color) && !willBeChecked(curR, 7, color)){
                //right castling
                let bet1 = document.getElementsByClassName("box r"+ curR +" c" + 6);
                let bet2 = document.getElementsByClassName("box r"+ curR +" c" + 7);
                if (bet1[0].innerHTML != '') return false;
                if (bet2[0].innerHTML != '') return false;
                let rook = document.getElementsByClassName("box r"+ curR +" c" + 8 );
                let des = document.getElementsByClassName("box r"+ curR +" c" + 6);
                if(whiteMove){
                    let res = castlingAvailable[1];
                    castlingAvailable[0] = false;
                    castlingAvailable[1] = false;
                    if(res){
                        des[0].innerHTML = rook[0].innerHTML;
                        des[0].style.color = rook[0].style.color;
                        rook[0].innerHTML = '';
                        rook[0].style.color = '';
                        whiteKing = [curR, curC];
                    }
                    return res;

                }
                else{
                    let res = castlingAvailable[3]
                    castlingAvailable[3] = false;
                    castlingAvailable[2] = false;
                    if(res){
                        des[0].innerHTML = rook[0].innerHTML;
                        des[0].style.color = rook[0].style.color;
                        rook[0].innerHTML = '';
                        rook[0].style.color = '';
                        blackKing = [curR, curC];
                    }
                    return res;
                }
            }
            if(rdiff <= 1 && cdiff <= 1 && !willBeChecked(curR,curC,color)){
                if(whiteMove){
                    castlingAvailable[0] = false;
                    castlingAvailable[1] = false;
                    whiteKing = [curR, curC];
                }
                else{
                    castlingAvailable[2] = false;
                    castlingAvailable[3] = false;
                    blackKing = [curR, curC];
                }
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
    /*for PAWN check TODO */
    if (whiteMove){
        //if white needs to be careful on pawn in front (i.e. row is lower)
        if(R-1 >= 1 && C-1 >=1){
            const cPiece1 = document.getElementsByClassName("box r"+ (R-1) +" c" + (C-1));
            if(cPiece1[0].style.color != color && cPiece1[0].innerHTML == PAWN) {return true;}
        }
        if(R-1 >= 1 && C+1 <= 8){
            const cPiece2 = document.getElementsByClassName("box r"+ (R-1) +" c" + (C+1));
            if(cPiece2[0].style.color != color && cPiece2[0].innerHTML == PAWN) {return true;}
        }
    }
    else{
        //if black needs to be careful on pawn in back (i.e. row is higher)
        if(R+1 <= 8 && C-1 >=1){
            const cPiece1 = document.getElementsByClassName("box r"+ (R+1) +" c" + (C-1));
            if(cPiece1[0].style.color != color && cPiece1[0].innerHTML == PAWN) {return true;}
        }
        if(R+1 <= 8 && C+1 <= 8){
            const cPiece2 = document.getElementsByClassName("box r"+ (R+1) +" c" + (C+1));
            if(cPiece2[0].style.color != color && cPiece2[0].innerHTML == PAWN) {return true;}
        }

    }

    return false;
}
//TO DO: will highlight valid moves, then put valid class to the valid elements
function displayMove(r,c,piece,color){
    let moves = getMoves(r,c,piece,color);
    for(let i = 0; i < moves.length; i++){
        let box = getBox(moves[i][0],moves[i][1])[0];
        box.id = 'valid';
    }
    //console.log(moves);
    //TO DO [done]
}
//validate if valid piece to move (i.e. not being blocked by allies or will not lead to a check)
function checkPiece(r,c,piece,color){
    /*
    TO DO
    LOGIC:
    Piece can't be selected IF blocked OR will lead to a check of KING [x]
    additional to do: add checking of piece that can remove check
     */
    const multiplier = (color == 'black') ? -1:1;
    let colorCont, colorFlag;
    switch(piece){
        case PAWN:
            // blocked case
            const front = document.getElementsByClassName("box r"+ (r-multiplier) +" c" + c );
            let flag1 = false;
            let flag2 = false;
            if(c+1 <= 8){
                const side1 = document.getElementsByClassName("box r"+ (r-multiplier) +" c" + (parseInt(c)+1));
                if (side1[0].innerHTML == '' || side1[0].style.color == color) flag1 = true;
            }
            else{
                flag1 = true;
            }
            if(c-1 >= 1){
                const side2 = document.getElementsByClassName("box r"+ (r-multiplier) +" c" + (c-1));
                if (side2[0].innerHTML == '' || side2[0].style.color == color) flag2 = true;
            }
            else{
                flag2 = true;
            }
            if (front[0].innerHTML != '' && flag1 && flag2) return false;
            break;
        case ROOK:
            // blocked case
            colorCont = [];
            colorFlag = false;
            if(r + 1 <= 8){
                const topPiece = document.getElementsByClassName("box r"+ (r+1) +" c" + c );
                colorCont.push(topPiece[0].style.color);
            }
            if(r - 1 >= 1){
                const bottomPiece = document.getElementsByClassName("box r"+ (r-1) +" c" + c );
                colorCont.push(bottomPiece[0].style.color);
            }
            if(c + 1 <= 8){
                const rightPiece = document.getElementsByClassName("box r"+ r +" c" + (c + 1) );
                colorCont.push(rightPiece[0].style.color);
            }
            if(c - 1 >= 1){
                const leftPiece = document.getElementsByClassName("box r"+ r +" c" + (c - 1) );
                colorCont.push(leftPiece[0].style.color);
            }
            for (let i = 0; i < colorCont.length; i++){
                if(colorCont[i] != color){
                    colorFlag = true;
                }
            }
            if(!colorFlag){
                return colorFlag;
            }


            break;
        case KNIGHT:
            // blocked case
            colorCont = [];
            colorFlag = false;
            if(r + 2 <= 8 && c+1 <=8){
                const piece1 = document.getElementsByClassName("box r"+ (r+2) +" c" + (c+1) );
                colorCont.push(piece1[0].style.color);
            }
            if(r + 2 <= 8 && c-1 >=8){
                const piece2 = document.getElementsByClassName("box r"+ (r+2) +" c" + (c-1) );
                colorCont.push(piece2[0].style.color);
            }
            if(r + 1 <= 8 && c+2 <=8){
                const piece3 = document.getElementsByClassName("box r"+ (r+1) +" c" + (c+2) );
                colorCont.push(piece3[0].style.color);
            }
            if(r + 1 <= 8 && c-2 >=1){
                const piece4 = document.getElementsByClassName("box r"+ (r+1) +" c" + (c-2) );
                colorCont.push(piece4[0].style.color);
            }
            if(r - 1 >= 1 && c+2 <=8){
                const piece5 = document.getElementsByClassName("box r"+ (r-1) +" c" + (c+2) );
                colorCont.push(piece5[0].style.color);
            }
            if(r - 1 >= 1 && c-2 >=1){
                const piece6 = document.getElementsByClassName("box r"+ (r-1) +" c" + (c-2) );
                colorCont.push(piece6[0].style.color);
            }
            if(r - 2 >= 1 && c+1 <=8){
                const piece7 = document.getElementsByClassName("box r"+ (r-2) +" c" + (c+1) );
                colorCont.push(piece7[0].style.color);
            }
            if(r - 2 >= 1 && c-1 >=1){
                const piece8 = document.getElementsByClassName("box r"+ (r-2) +" c" + (c-1) );
                colorCont.push(piece8[0].style.color);
            }
            for (let i = 0; i < colorCont.length; i++){
                if(colorCont[i] != color){
                    colorFlag = true;
                }
            }

            if(!colorFlag){
                return colorFlag;
            }
            break;
        case BISHOP:
            // blocked case
            colorCont = [];
            colorFlag = false;
            if(r + 1 <= 8 && c+1 <=8){
                const topPiece = document.getElementsByClassName("box r"+ (r+1) +" c" + (c+1) );
                colorCont.push(topPiece[0].style.color);
            }
            if(r - 1 >= 1 && c+1 <=8){
                const bottomPiece = document.getElementsByClassName("box r"+ (r-1) +" c" + (c+1) );
                colorCont.push(bottomPiece[0].style.color);
            }
            if(c - 1 >= 1 && r + 1 <= 8){
                const rightPiece = document.getElementsByClassName("box r"+ (r+1) +" c" + (c - 1) );
                colorCont.push(rightPiece[0].style.color);
            }
            if(c - 1 >= 1 && r - 1 >= 1 ){
                const leftPiece = document.getElementsByClassName("box r"+ (r-1) +" c" + (c - 1) );
                colorCont.push(leftPiece[0].style.color);
            }
            for (let i = 0; i < colorCont.length; i++){
                if(colorCont[i] != color){
                    colorFlag = true;
                }
            }
            if(!colorFlag){
                return colorFlag;
            }
            break;
        case KING:
            // checked
            if(isChecked){
                let boxesToCheck = [];
                let flag = true;
                if(r+1 <= 8){
                    let box1 = getBox(r+1,c);
                    if (box1[0].style.color != color) boxesToCheck.push(box1);
                }
                if(r-1 >= 1){
                    let box2 = getBox(r-1,c);
                    if (box2[0].style.color != color) boxesToCheck.push(box2);
                }
                if(c+1 <= 8){
                    let box3 = getBox(r,c+1);
                    if (box3[0].style.color != color) boxesToCheck.push(box3);
                }
                if(c-1 >= 1){
                    let box4 = getBox(r,c-1);
                    if (box4[0].style.color != color) boxesToCheck.push(box4);
                }
                if(r+1 <= 8 && c+1 <= 8){
                    let box5 = getBox(r+1,c+1);
                    if (box5[0].style.color != color) boxesToCheck.push(box5);
                }
                if(r+1 <= 8 && c-1 >= 1){
                    let box6 = getBox(r+1,c-1);
                    if (box6[0].style.color != color) boxesToCheck.push(box6);
                }
                if(r-1 >= 1 && c+1 <= 8){
                    let box7 = getBox(r-1,c+1);
                    if (box7[0].style.color != color) boxesToCheck.push(box7);
                }
                if(r-1 >= 1 && c-1 >= 1){
                    let box8 = getBox(r-1,c-1);
                    if (box8[0].style.color != color) boxesToCheck.push(box8);
                }
                for(let i = 0; i < boxesToCheck.length; i++){
                    flag &= willBeChecked(boxesToCheck[i][0].className[5],boxesToCheck[i][0].className[8],color);
                }
                if(flag){
                    return false;
                }
            }
            // blocked case
            return (checkPiece(r,c,ROOK,color) || checkPiece(r,c,BISHOP,color));
        case QUEEN:
            return (checkPiece(r,c,ROOK,color) || checkPiece(r,c,BISHOP,color));
    }
    // check case
    // row and column scanners
    let ifront = (r + 1) <= 8? (r+1):null;
    let iback = (r - 1) >= 1? (r-1):null;
    let jfront = (c + 1) <= 8? (c+1):null;
    let jback = (c - 1) >= 1? (c-1):null;
    // diagonal scanners
    let diag1 = [ifront, jfront];
    let diag2 = [ifront, jback];
    let diag3 = [iback, jfront];
    let diag4 = [iback, jback];
    while(ifront || iback || jfront || jback || (diag1[0] && diag1[1]) || (diag2[0] && diag2[1]) || (diag3[0] && diag3[1]) || (diag4[0] && diag4[1])){
        if(ifront){
            const frontPiece = document.getElementsByClassName("box r"+ ifront +" c" + c);
            if (frontPiece[0].innerHTML == KING && frontPiece[0].style.color == color){
                // do check on the back to see if enemy rook or queen is present, if yes then check if piece can capture, return false
                for(let x = r - 1; x >= 1; x--){
                    const cPiece = document.getElementsByClassName("box r"+ x + " c" + c);
                    if(cPiece[0].style.color != color && (cPiece[0].innerHTML == ROOK || cPiece[0].innerHTML == QUEEN) && !(piece == ROOK || piece == QUEEN)){
                        return false;
                    }
                }
            }
            ifront = (ifront + 1) <= 8? (ifront+1):null;
            if(frontPiece[0].innerHTML != ''){ifront = null;}
        }
        if(iback){
             const backPiece = document.getElementsByClassName("box r"+ iback +" c" + c);
             if (backPiece[0].innerHTML == KING && backPiece[0].style.color == color){
                // do check on the front to see if enemy rook or queen is present, if yes, return false
                for(let x = r + 1; x <= 8; x++){
                    const cPiece = document.getElementsByClassName("box r"+ x + " c" + c);
                    if(cPiece[0].style.color != color && (cPiece[0].innerHTML == ROOK || cPiece[0].innerHTML == QUEEN)&& !(piece == ROOK || piece == QUEEN)){
                        return false;
                    }
                }
            }
            iback = (iback - 1) >= 1? (iback-1):null;
            if(backPiece[0].innerHTML != ''){iback = null;}
        }
        if(jfront){ 
            const rightPiece = document.getElementsByClassName("box r"+ r +" c" + jfront);
            if (rightPiece[0].innerHTML == KING && rightPiece[0].style.color == color){
                // do check on the left to see if enemy rook or queen is present, if yes, return false
                for(let x = c - 1; x >= 1; x--){
                    const cPiece = document.getElementsByClassName("box r"+ r + " c" + x);
                    if(cPiece[0].style.color != color && (cPiece[0].innerHTML == ROOK || cPiece[0].innerHTML == QUEEN)&& !(piece == ROOK || piece == QUEEN)){
                        return false;
                    }
                }
            }
            jfront = (jfront + 1) <= 8? (jfront+1):null;
            if(rightPiece[0].innerHTML != ''){jfront = null;}
        }
        if(jback){ 
            const leftPiece = document.getElementsByClassName("box r"+ r +" c" + jback);
            if (leftPiece[0].innerHTML == KING && leftPiece[0].style.color == color){
                // do check on the right to see if enemy rook or queen is present, if yes, return false
                for(let x = c + 1; x <= 8; x++){
                    const cPiece = document.getElementsByClassName("box r"+ r + " c" + x);
                    if(cPiece[0].style.color != color && (cPiece[0].innerHTML == ROOK || cPiece[0].innerHTML == QUEEN)&& !(piece == ROOK || piece == QUEEN)){
                        return false;
                    }
                }
            }
            jback = (jback - 1) >= 1? (jback-1):null;
            if(leftPiece[0].innerHTML != ''){jback = null;}
        }
        if(diag1[0] && diag1[1]){
            const diagPiece1 = document.getElementsByClassName("box r"+ diag1[0] +" c" + diag1[1]);
            if(diagPiece1[0].innerHTML == KING && diagPiece1[0].style.color == color){
                // do check on the opposite diagonal to see if enemy bishop or queen is present, if yes, return false
                for(let x = r - 1, y = c - 1; x >= 1 && y >= 1; x--, y--){
                    const cPiece = document.getElementsByClassName("box r"+ x + " c" + y);
                    if(cPiece[0].style.color != color && (cPiece[0].innerHTML == BISHOP || cPiece[0].innerHTML == QUEEN)&& !(piece == BISHOP || piece == QUEEN)){
                        return false;
                    }
                }
            }
            diag1 = [(diag1[0] + 1) <= 8? (diag1[0] + 1):null , (diag1[1] + 1) <= 8? (diag1[1] + 1):null];
            if(diagPiece1[0].innerHTML != ''){diag1 = [null,null];}
        }
        if(diag2[0] && diag2[1]){
            const diagPiece2 = document.getElementsByClassName("box r"+ diag2[0] +" c" + diag2[1]);
            if(diagPiece2[0].innerHTML == KING && diagPiece2[0].style.color == color){
                // do check on the opposite diagonal to see if enemy bishop or queen is present, if yes, return false
                for(let x = r - 1, y = c + 1; x >= 1 && y <= 8; x--, y++){
                    const cPiece = document.getElementsByClassName("box r"+ x + " c" + y);
                    if(cPiece[0].style.color != color && (cPiece[0].innerHTML == BISHOP || cPiece[0].innerHTML == QUEEN)&& !(piece == BISHOP || piece == QUEEN)){
                        return false;
                    }
                }
            }
            diag2 = [(diag2[0] + 1) <= 8? (diag2[0] + 1):null , (diag2[1] - 1) >= 1? (diag2[1] - 1):null];
            if(diagPiece2[0].innerHTML != ''){diag2 = [null,null];}
        }
        if(diag3[0] && diag3[1]){
            const diagPiece3 = document.getElementsByClassName("box r"+ diag3[0] +" c" + diag3[1]);
            if(diagPiece3[0].innerHTML == KING && diagPiece3[0].style.color == color){
                // do check on the opposite diagonal to see if enemy bishop or queen is present, if yes, return false
                for(let x = r + 1, y = c - 1; x <= 8 && y >= 1; x++, y--){
                    const cPiece = document.getElementsByClassName("box r"+ x + " c" + y);
                    if(cPiece[0].style.color != color && (cPiece[0].innerHTML == BISHOP || cPiece[0].innerHTML == QUEEN)&& !(piece == BISHOP || piece == QUEEN)){
                        return false;
                    }
                }
            }
            diag3 = [(diag3[0] - 1) >= 1? (diag3[0] - 1):null , (diag3[1] + 1) <= 8? (diag3[1] + 1):null];
            if(diagPiece3[0].innerHTML != ''){diag3 = [null,null];}
        }
        if(diag4[0] && diag4[1]){
            const diagPiece4 = document.getElementsByClassName("box r"+ diag4[0] +" c" + diag4[1]);
            if(diagPiece4[0].innerHTML == KING && diagPiece4[0].style.color == color){
                // do check on the opposite diagonal to see if enemy bishop or queen is present, if yes, return false
                for(let x = r + 1, y = c + 1; x <= 8 && y <= 8; x++, y++){
                    const cPiece = document.getElementsByClassName("box r"+ x + " c" + y);
                    if(cPiece[0].style.color != color && (cPiece[0].innerHTML == BISHOP || cPiece[0].innerHTML == QUEEN)&& (piece != BISHOP || piece != QUEEN)){
                        return false;
                    }
                }
            }
            diag4 = [(diag4[0] - 1) >= 1? (diag4[0] - 1):null , (diag4[1] - 1) >= 1? (diag4[1] - 1):null];
            if(diagPiece4[0].innerHTML != ''){diag4 = [null,null];}
        }
    }
    if(isChecked){
        /*TO DO
        Logic:
        if Check, piece that can only move are piece that can capture the check or can block the check or KING
        1. Check what rank the checker is, available moves when checked:
            a. King moves away from the check -> needs to be a valid move and will not result to another check [done]
            b. A piece blocks the check -> identify the checker and identify if there is a piece available to block the path
            c. capture the checker
         */
        let dangerR,dangerC;
        // identify where the king and aggressor is
        if(whiteMove){
            dangerR = whiteKing[0];
            dangerC = whiteKing[1];
        }
        else{
            dangerR = blackKing[0];
            dangerC = blackKing[1];
        }

        let aggresorR = checker[0].className[5];
        let aggresorC = checker[0].className[8];
        let path = [[aggresorR,aggresorC]]; //path from aggresor to checked king
        let moves = getMoves(r,c,piece,color);
        let rdiff = aggresorR - dangerR;
        let cdiff = aggresorC - dangerC;
        let i = aggresorR - rdiff/Math.abs(rdiff);
        let j = aggresorC - cdiff/Math.abs(cdiff);
        while (i != dangerR && j != dangerC){
            if (getBox(aggresorR,aggresorC)[0].innerHTML == KNIGHT || getBox(aggresorR,aggresorC)[0].innerHTML == PAWN) break; // aggressor is pawn or knight path is only to capture
            path.push([i,j]);
            i = i - rdiff/Math.abs(rdiff);
            j = j - cdiff/Math.abs(cdiff);
        }

        if (intersection(path,moves).length == 0) return false;
        //reset checker
    }
    return true;
}

// return set of moves available
function getMoves(r,c,piece,color){
    let res = [];
    r = parseInt(r);
    c = parseInt(c);
    let ifront = (r + 1) <= 8? (r+1):null;
    let iback = (r - 1) >= 1? (r-1):null;
    let jfront = (c + 1) <= 8? (c+1):null;
    let jback = (c - 1) >= 1? (c-1):null;

    let diag1 = [ifront, jfront];
    let diag2 = [ifront, jback];
    let diag3 = [iback, jfront];
    let diag4 = [iback, jback];
    switch(piece){
        case PAWN:
            if(whiteMove){
                if(r != 7){
                    if(getBox(r-1,c)[0].innerHTML =='') res.push([r-1,c]);
                }
                else{
                    if(getBox(r-1,c)[0].innerHTML =='') res.push([r-1,c]);
                    if(getBox(r-2,c)[0].innerHTML =='') res.push([r-2,c]);
                }
                if(c != 1){
                    if(getBox(r-1,c-1)[0].style.color != color && getBox(r-1,c-1)[0].innerHTML != '') res.push([r-1,c-1]);
                }
                if(c != 8){
                    if(getBox(r-1,c+1)[0].style.color != color && getBox(r-1,c+1)[0].innerHTML != '') res.push([r-1,c+1]);
                }

            }
            else{
                if(r != 2){
                    if(getBox(r+1,c)[0].innerHTML =='') res.push([r+1,c]);
                }
                else{
                    if(getBox(r+1,c)[0].innerHTML =='') res.push([r+1,c]);
                    if(getBox(r+2,c)[0].innerHTML =='') res.push([r+2,c]);
                }
                if(c != 1){
                    if(getBox(r+1,c-1)[0].style.color != color  && getBox(r+1,c-1)[0].innerHTML != '') res.push([r+1,c-1]);
                }
                if(c != 8){
                    if(getBox(r+1,c+1)[0].style.color != color  && getBox(r+1,c+1)[0].innerHTML != '') res.push([r+1,c+1]);
                }
            }
            break;
        case ROOK:
            while(ifront||jfront||iback||jback){
                if(ifront){
                    if(getBox(ifront,c)[0].style.color != color) {
                        res.push([ifront,c]);
                        if(getBox(ifront,c)[0].innerHTML != '') ifront = null;
                        if(ifront) ifront = (ifront + 1) <= 8? (ifront+1):null;
                    }
                    else {ifront = null;}
                }
                if(jfront){
                    if(getBox(r,jfront)[0].style.color != color) {
                        res.push([r,jfront]);
                        if(getBox(r,jfront)[0].innerHTML != '') jfront = null;
                        if(jfront) jfront = (jfront + 1) <= 8? (jfront+1):null;
                    }
                    else {jfront = null;}
                }
                if(iback){
                    if(getBox(iback,c)[0].style.color != color) {
                        res.push([iback,c]);
                        if(getBox(iback,c)[0].innerHTML != '') iback = null;
                        if(iback) iback = (iback - 1) >= 1? (iback-1):null;
                    }
                    else {iback = null;}
                }
                if(jback){
                    if(getBox(r,jback)[0].style.color != color) {
                        res.push([r,jback]);
                        if(getBox(r,jback)[0].innerHTML != '') jback = null;
                        if(jback) jback = (jback - 1) >= 1? (jback-1):null;
                    }
                    else {jback = null;}
                }
            }
            break;
        case KNIGHT:
            if(r+1 <= 8 && c+2 <= 8){
                if(getBox(r+1,c+2)[0].style.color != color) res.push([r+1,c+2]);
            }
            if(r+1 <= 8 && c-2 >= 1){
                if(getBox(r+1,c-2)[0].style.color != color) res.push([r+1,c-2]);
            }
            if(r+2 <= 8 && c-1 >= 1){
                if(getBox(r+2,c-1)[0].style.color != color) res.push([r+2,c-1]);
            }
            if(r+2 <= 8 && c+1 <= 8){
                if(getBox(r+2,c+1)[0].style.color != color) res.push([r+2,c+1]);
            }
            if(r-1 >= 1 && c+2 <= 8){
                if(getBox(r-1,c+2)[0].style.color != color) res.push([r-1,c+2]);
            }
            if(r-1 >= 1 && c-2 >= 1){
                if(getBox(r-1,c-2)[0].style.color != color) res.push([r-1,c-2]);
            }
            if(r-2 >= 1 && c+1 <= 8){
                if(getBox(r-2,c+1)[0].style.color != color) res.push([r-2,c+1]);
            }
            if(r-2 >= 1 && c-1 >= 1){
                if(getBox(r-2,c-1)[0].style.color != color) res.push([r-2,c-1]);
            }
            break;
        case BISHOP:
            while((diag1[0] && diag1[1]) || (diag2[0] && diag2[1]) || (diag3[0] && diag3[1]) || (diag4[0] && diag4[1])){
                if(diag1[0] && diag1[1]){
                    if(getBox(diag1[0],diag1[1])[0].style.color != color) {
                        res.push(diag1);
                        if(getBox(diag1[0],diag1[1])[0].innerHTML != '') diag1 = [null, null];
                        if(diag1[0] && diag1[1]) diag1 = [(diag1[0] + 1) <= 8? (diag1[0] + 1):null , (diag1[1] + 1) <= 8? (diag1[1] + 1):null];
                    }
                    else diag1 = [null,null];
                }
                if(diag2[0] && diag2[1]){
                    if(getBox(diag2[0],diag2[1])[0].style.color != color) {
                        res.push(diag2);
                        if(getBox(diag2[0],diag2[1])[0].innerHTML != '') diag2 = [null, null];
                        if(diag2[0] && diag2[1]) diag2 = [(diag2[0] + 1) <= 8? (diag2[0] + 1):null , (diag2[1] - 1) >= 1? (diag2[1] - 1):null];
                    }
                    else diag2 = [null,null];
                }
                if(diag3[0] && diag3[1]){
                    if(getBox(diag3[0],diag3[1])[0].style.color != color) {
                        res.push(diag3);
                        if(getBox(diag3[0],diag3[1])[0].innerHTML != '') diag3 = [null, null];
                        if(diag3[0] && diag3[1]) diag3 = [(diag3[0] - 1) >= 1? (diag3[0] - 1):null , (diag3[1] + 1) <= 8? (diag3[1] + 1):null];
                    }
                    else diag3 = [null,null];
                }
                if(diag4[0] && diag4[1]){
                    if(getBox(diag4[0],diag4[1])[0].style.color != color) {
                        res.push(diag4);
                        if(getBox(diag4[0],diag4[1])[0].innerHTML != '') diag4 = [null, null];
                        if(diag4[0] && diag4[1]) diag4 = [(diag4[0] - 1) >= 1? (diag4[0] - 1):null , (diag4[1] - 1) >= 1? (diag4[1] - 1):null];
                    }
                    else diag4 = [null,null];
                }
            }
            break;
        case QUEEN:
            return union(getMoves(r,c,ROOK,color),getMoves(r,c,BISHOP,color));
        case KING:
            if(r+1 <= 8){
                let box1 = getBox(r+1,c);
                if (box1[0].style.color != color) res.push([r+1,c]);
            }
            if(r-1 >= 1){
                let box2 = getBox(r-1,c);
                if (box2[0].style.color != color) res.push([r-1,c]);
            }
            if(c+1 <= 8){
                let box3 = getBox(r,c+1);
                if (box3[0].style.color != color) res.push([r,c+1]);
            }
            if(c-1 >= 1){
                let box4 = getBox(r,c-1);
                if (box4[0].style.color != color) res.push([r,c-1]);
            }
            if(r+1 <= 8 && c+1 <= 8){
                let box5 = getBox(r+1,c+1);
                if (box5[0].style.color != color) res.push([r+1,c+1]);
            }
            if(r+1 <= 8 && c-1 >= 1){
                let box6 = getBox(r+1,c-1);
                if (box6[0].style.color != color) res.push([r+1,c-1]);
            }
            if(r-1 >= 1 && c+1 <= 8){
                let box7 = getBox(r-1,c+1);
                if (box7[0].style.color != color) res.push([r-1,c+1]);
            }
            if(r-1 >= 1 && c-1 >= 1){
                let box8 = getBox(r-1,c-1);
                if (box8[0].style.color != color) res.push([r-1,c-1]);
            }
            break;
    }
    //console.log(res);
    return res;
}
// a isIn b? example usage: [1,2] in [[1,2],[3,4]]? ==> true ==> isIn([1,2],[[1,2],[3,4]]) = true
function isIn(a,b){
    for(let i = 0; i < b.length; i++){
        if(b[i][0] == a[0] && b[i][1] == a[1]) return true;
    }
    return false;
}
// union of a and b
function union(a,b){
    for (let i = 0; i < b.length; i++){
        if(!isIn(b[i],a)) a.push(b[i]);
    }
    return a;
}
// intersection of a and b
function intersection(a,b){
    let res = [];
    for (let i = 0; i < b.length; i++){
        if(isIn(b[i],a)) res.push(b[i]);
    }
    return res;
}
//timers
function timerWhite(){
    wTime = wTime - 1;
    WHITETIME[0].innerHTML = "White - "+displayTime(wTime);
    checkVictory();
}
function timerBlack(){
    bTime = bTime - 1;
    BLACKTIME[0].innerHTML = "Black - "+displayTime(bTime);
    checkVictory();
}
function displayTime(time){
    return (Math.floor(time/60)) + ":" + ("0"+(time%60)).slice(-2);
}
putChessPieces(); 