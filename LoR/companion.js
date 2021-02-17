const CARDS = set1.concat(set2,set3);
console.log(CARDS[0])
const CARDCODE = CARDS.map(x => x.cardCode);

const PORT = '21337';
const CONTAINER = document.getElementById('companionContainer');
let stateCache = null;
let stateChange = false;
let curve = [0,0,0,0,0,0,0,0,0];
let curve_per = [0,0,0,0,0,0,0,0,0];
function checkDeck(){
    setInterval( async function(){
        try{
        let data2 = await fetch(`http://127.0.0.1:${PORT}/positional-rectangles`);
        let data2_json = await data2.json();
        let gameState = await data2_json.GameState;

        if(gameState !== stateCache){
            stateChange = true;
        }
        else if (gameState === stateCache){
            stateChange = false;
        }
        stateCache = gameState;

        if(stateChange && gameState === 'InProgress'){
            setTimeout(async function(){
                clearContainer();
                let data = await fetch(`http://127.0.0.1:${PORT}/static-decklist`);
                if(!data.ok){
                    const message = `An error has occured: ${response.status}`;
                    throw new Error(message);
                }
                let data_json = await data.json();
                if(data_json.DeckCode !== null){
                    curve = [0,0,0,0,0,0,0,0,0];
                    CONTAINER.innerHTML = "Current Deck Cards:";
                    CONTAINER.appendChild(document.createElement('br'));
                    let subContainer = document.createElement('div');
                    subContainer.classList.add('p-2');
                    for(card in data_json.CardsInDeck){
                        if(CARDS[CARDCODE.indexOf(card)].cost < 8){
                            curve[CARDS[CARDCODE.indexOf(card)].cost] += data_json.CardsInDeck[card];
                        }
                        else{
                            curve[8] += data_json.CardsInDeck[card];
                        }
                        let card_img = document.createElement('img');
                        let card_img_div = document.createElement('span');
                        let img_src = CARDS[CARDCODE.indexOf(card)].assets[0].gameAbsolutePath;
                        card_img.src = img_src;
                        card_img.alt = CARDS[CARDCODE.indexOf(card)].name;
                        card_img.classList.add('onHover');
                        card_img.classList.add('m-3');

                        //card_img_div.classList.add('container-sm');
                        card_img_div.classList.add('text-light');
                        card_img_div.classList.add('m-3');
                        card_img_div.classList.add('bg-dark');
                        card_img_div.appendChild(card_img)
                        card_img_div.innerHTML += ` x ${data_json.CardsInDeck[card]}`
                        subContainer.appendChild(card_img_div)
                    }
                    CONTAINER.appendChild(subContainer)
                    CONTAINER.appendChild(document.createElement('br'));
                    CONTAINER.innerHTML += "Curve:";
                    curve_per =  curve.map(x => 100*x/40);
                    let subContainer_2 = document.createElement('div');
                    subContainer_2.innerHTML = curve_per;
                    CONTAINER.appendChild(subContainer_2)
                }
            }, 1000);
        }
        else if(gameState !== 'InProgress'){
                clearContainer();
                CONTAINER.innerHTML = 'NO GAME IN PROGRESS';
            }
        

            /* let data3 = await fetch(`http://127.0.0.1:${PORT}/game-result`);
            let data3_json = await data3.json();
            */
        }
        catch{
            clearContainer();
            CONTAINER.innerHTML = "Please open game!"
        }

    },1000);
}

function clearContainer(){
    while(CONTAINER.children.length >= 1){
        CONTAINER.children[0].remove();
    }
}


checkDeck();

// http://127.0.0.1:{port}/game-result

