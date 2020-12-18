//assigning chess pieces characters
const PAWN = "&#9823";
const ROOK = "&#9820";
const KNIGHT = "&#9822";
const BISHOP = "&#9821";
const QUEEN = "&#9819";
const KING = "&#9818";
var draggingPiece = false;

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

//dragging and dropping pieces
/*TO DO:
    1. DO logic for dragging if draggingPiece = true
    2. DO logic for dropping if draggingPiece = false
    3. if draggingPiece = true, the only way to set it to false is to click a valid 'box' which will be checked by checkMove()
    4. if draggingPiece = false, the only way to set it to false is to click a valid 'piece' that can move which will be checked by checkPiece()
*/
function movePieces(r,c){
    let piece = document.getElementsByClassName("box r"+ r +" c" + c );
    console.log(piece);


    if(draggingPiece){
        //check possible moves

        draggingPiece = false;
    }
    else if(!draggingPiece){
        //stick piece to cursor
        //checks if there's a piece
        if(piece.innerHTML != ''){
            draggingPiece = true;

        }
        else{
            return;
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