//assigning chess pieces characters
const PAWN = "&#9823";
const ROOK = "&#9820";
const KNIGHT = "&#9822";
const BISHOP = "&#9821";
const QUEEN = "&#9819";
const KING = "&#9818";

//function for populating the board the default
function putChessPieces() {
    const box = document.getElementsByClassName("box");

    for(let i = 0; i < box.length;i++){
        if((i>7 && i<16)||(i>47 && i<56)){
        box[i].innerHTML = PAWN;
        }
        if(i == 0 || i == 7 || i == 56 || i == 63){
            box[i].innerHTML = ROOK;        
        }
        if(i == 1 || i == 6 || i == 57 || i == 62){
            box[i].innerHTML = KNIGHT;        
        }
        if(i == 2 || i == 5 || i == 58 || i == 61){
            box[i].innerHTML = BISHOP;        
        }
        if(i == 3 || i == 59){
            box[i].innerHTML = QUEEN;        
        }
        if(i == 4 || i == 60){
            box[i].innerHTML = KING;        
        }
        if(i<17){
            box[i].style.color = 'black';
        }

     }
    
}

//function for clearing the board
function removePieces(){
    const box = document.getElementsByClassName("box");

    for(let i = 0; i < box.length;i++){
        
        box[i].innerHTML = "";
    }
}


//for debugging
function printStatus(){
    
    console.log(window.innerHeight);
    console.log(window.innerWidth);
}