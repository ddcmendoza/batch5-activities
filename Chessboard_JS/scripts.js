/*
General TODO:
1. Alternating moves
2. Move and Move Checking (In Progress)
3. Piece Checking
4. Victory Condition - Checkmate
5. En passant and other special cases

*/

//assigning chess pieces characters
const PAWN = "&#9823";
const ROOK = "&#9820";
const KNIGHT = "&#9822";
const BISHOP = "&#9821";
const QUEEN = "&#9819";
const KING = "&#9818";
var clickingPiece = false;
var holdingPiece = null;
var holdingPieceColor = null;
var containerPiece = null;
const BOX = document.getElementsByClassName("box");
const DESC = document.getElementsByClassName("description");
//function for populating the board the default
function putChessPieces() {
    for(let i = 0; i < BOX.length;i++){
        if((i>7 && i<16)||(i>47 && i<56)){
            BOX[i].innerHTML = PAWN;
            }
        if(i == 0 || i == 7 || i == 56 || i == 63){
            BOX[i].innerHTML = ROOK;
        }
        if(i == 1 || i == 6 || i == 57 || i == 62){
            BOX[i].innerHTML = KNIGHT;
        }
        if(i == 2 || i == 5 || i == 58 || i == 61){
            BOX[i].innerHTML = BISHOP;
        }
        if(i == 3 || i == 59){
            BOX[i].innerHTML = QUEEN;
        }
        if(i == 4 || i == 60){
            BOX[i].innerHTML = KING;
        }
        if(i<17){
            BOX[i].style.color = 'black';
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

}

//clicking and dropping pieces
/*TO DO:
    1. DO logic for clicking if clickingPiece = true [partially done]
    2. DO logic for dropping if clickingPiece = false [partially done]
    3. if clickingPiece = true, the only way to set it to false is to click a valid 'box' which will be checked by checkMove()
    4. if clickingPiece = false, the only way to set it to false is to click a valid 'piece' that can move which will be checked by checkPiece()
*/
function movePieces(r,c){
    let piece = document.getElementsByClassName("box r"+ r +" c" + c );

    if(clickingPiece){
        //check possible moves
        containerPiece.innerHTML ="";
        piece[0].innerHTML = holdingPiece;
        piece[0].style.color = holdingPieceColor;
        //reset value
        clickingPiece = false;
        holdingPiece = null;
        holdingPieceColor = null;
        containerPiece = null
    }
    else if(!clickingPiece){
        //checks if there's a piece
        if(piece[0].innerHTML != ''){
             clickingPiece = true;
            holdingPiece = piece[0].innerHTML;
            holdingPieceColor = piece[0].style.color;
            containerPiece = piece[0];
        }
    }
}
//validate if valid move
function checkMove(){
    //TO DO
}
//validate if valid piece
function checkPiece(){
    //TO DO
}



//for debugging
function printStatus(){
    console.log(window.innerHeight);
    console.log(window.innerWidth);
}