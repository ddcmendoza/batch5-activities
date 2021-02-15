const PORT = '21337';
const CONTAINER = document.getElementById('companionContainer');
const SETS = {
    "01": 'set1',
    "02": 'set2',
    "03": 'set3',
}
function checkDeck(){
    setTimeout(async function(){
    clearContainer();

    let data = await fetch(`http://127.0.0.1:${PORT}/static-decklist`);
    let data_json = await data.json();
    if(data_json.DeckCode !== null){
        for(card in data_json.CardsInDeck){
            let set = SETS[card[0]+card[1]];
            let card_img = document.createElement('img');
            let card_img_div = document.createElement('div');
            let img_src = `img/cards/${set}/en_us/img/cards/${card}.png`;
            card_img.src = img_src;
            card_img_div.classList.add('container');
            card_img_div.classList.add('text-light');
            card_img_div.classList.add('bg-dark');
            card_img_div.appendChild(card_img)
            card_img_div.innerHTML += ` x ${data_json.CardsInDeck[card]}`
            CONTAINER.appendChild(card_img_div)
        }
    }
    else{
        CONTAINER.innerHTML = 'NO GAME IN PROGRESS'
    }
}, 1000);

    setInterval( async function(){
    

   let data2 = await fetch(`http://127.0.0.1:${PORT}/positional-rectangles`);
   let data2_json = await data2.json();
   if(data2_json.gameState)
   console.log(data2_json)
/*

    let data3 = await fetch(`http://127.0.0.1:${PORT}/game-result`);
    let data3_json = await data3.json();
 */

    },2500);
}

function clearContainer(){
    while(CONTAINER.children.length >= 1){
        CONTAINER.children[0].remove();
    }
}


checkDeck();

// http://127.0.0.1:{port}/game-result