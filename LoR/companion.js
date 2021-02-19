const CARDS = set1.concat(set2, set3);

const CARDCODE = CARDS.map(x => x.cardCode);

const PORT = '21337';
const CONTAINER = document.getElementById('companionContainer');

let stateCache = null;
let stateChange = false;
let curve = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let curve_per = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let currentGameCard = {};
let handCache = [];
let drawnCards = [];


currentGameCard = JSON.parse(localStorage.getItem('currentGameCard'));

function checkDeck() {
    setInterval(async function () {
        try {
            let data2 = await fetch(`http://127.0.0.1:${PORT}/positional-rectangles`);
            let data2_json = await data2.json();
            let gameState = await data2_json.GameState;

            if (gameState !== stateCache) {
                stateChange = true;
            }
            else if (gameState === stateCache) {
                stateChange = false;
            }
            stateCache = await gameState;

            if (stateChange && gameState === 'InProgress') {

                setTimeout(async function () {
                    handCache = [];
                    drawnCards = JSON.parse(localStorage.getItem('drawnCards'));
                    localStorage.setItem('handCache',JSON.stringify(handCache));
                    clearContainer();
                    let data = await fetch(`http://127.0.0.1:${PORT}/static-decklist`);
                    if (!data.ok) {
                        const message = `An error has occured: ${response.status}`;
                        throw new Error(message);
                    }
                    let data_json = await data.json();
                    localStorage.setItem('data',JSON.stringify(data_json));
                    if (data_json.DeckCode !== null) {
                        curve = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                        CONTAINER.innerHTML = "Current Deck Cards:";
                        CONTAINER.appendChild(document.createElement('br'));
                        let subContainer = document.createElement('div');
                        subContainer.classList.add('p-2');
                        currentGameCard = data_json.CardsInDeck;
                        localStorage.setItem('currentGameCard',JSON.stringify(currentGameCard));

                        for (card in await data_json.CardsInDeck) {
                            if (CARDS[CARDCODE.indexOf(card)].cost < 8) {
                                curve[CARDS[CARDCODE.indexOf(card)].cost] += data_json.CardsInDeck[card];
                            }
                            else {
                                curve[8] += data_json.CardsInDeck[card];
                            }
                            let card_img = document.createElement('img');
                            let card_img_div = document.createElement('span');
                            let card_img_span = document.createElement('span');
                            let img_src = CARDS[CARDCODE.indexOf(card)].assets[0].gameAbsolutePath;
                            card_img.src = img_src;
                            card_img.alt = CARDS[CARDCODE.indexOf(card)].name;
                            card_img.classList.add('onHover');
                            card_img.classList.add('m-3');

                            //card_img_div.classList.add('container-sm');
                            card_img_span.id = card;
                            card_img_span.innerHTML += ` x ${data_json.CardsInDeck[card]}`
                            card_img_div.classList.add('text-light');
                            card_img_div.classList.add('m-3');
                            card_img_div.classList.add('bg-dark');
                            card_img_div.appendChild(card_img)
                            card_img_div.appendChild(card_img_span)
                            subContainer.appendChild(card_img_div)
                        }
                        CONTAINER.appendChild(subContainer)
                        CONTAINER.appendChild(document.createElement('br'));
                        CONTAINER.innerHTML += "Curve:";
                        CONTAINER.appendChild(document.createElement('br'));

                        curve_per = curve.map(x => 100 * x / 40);
                        let subContainer_2 = document.createElement('div');
                        for (let i = 0; i < curve_per.length; i++) {
                            let graph = document.createElement('div');

                            graph.classList.add('container-fluid');
                            let graph_child = document.createElement('div');
                            let graph_no = document.createElement('span');
                            graph_no.innerHTML = i + " ";
                            graph_no.classList.add('float-start')
                            graph_no.style.transform = 'translate(-15px,0)';
                            graph_child.innerHTML = curve_per[i] + "%";
                            /*   if(curve_per[i]=== 0){
                                    graph_child.hidden = true;
                                } */
                            graph_child.style.width = `${curve_per[i]}%`;
                            graph_child.style.backgroundColor = 'grey';


                            graph.appendChild(graph_no);
                            graph.appendChild(graph_child);
                            subContainer_2.appendChild(graph);
                        }
                        CONTAINER.appendChild(subContainer_2)
                    }
                }, 100);
            }
            else if (gameState !== 'InProgress') {
                localStorage.clear();
                drawnCards = [];
                localStorage.setItem('drawnCards',JSON.stringify(drawnCards));
                clearContainer();
                CONTAINER.innerHTML = 'NO GAME IN PROGRESS';
            }
            let hand = data2_json.Rectangles.filter(card => card.LocalPlayer === true && card.CardID > 0 && card.CardCode !== 'face' && card.TopLeftY < data2_json.Screen.ScreenHeight/2 - card.Height*1.5).map(item => item.CardCode);
                let board = data2_json.Rectangles.filter(card => card.LocalPlayer === true && card.CardID > 0 && card.CardCode !== 'face').map(item => item.CardCode);
    
                if(!isEqual(hand,handCache) && handCache.length <= hand.length){
                    // draw if hand.length - handCache.length > 0
                    let cardsToDeduct = difference(hand,handCache);
                    /* console.log(`hand.length: ${hand.length}`);
                    console.log(`handCache.length: ${handCache.length}`);
                    console.log(cardsToDeduct);  */
                    for(let i = 0; i < cardsToDeduct.length; i++){
                        if(currentGameCard[cardsToDeduct[i]]){
                            console.log(document.getElementById(`${cardsToDeduct[i]}`))
                             currentGameCard[cardsToDeduct[i]] -= 1;
                             document.getElementById(`${cardsToDeduct[i]}`).innerHTML = ` x ${currentGameCard[cardsToDeduct[i]]}`;
                             drawnCards.push(cardsToDeduct[i]);
                        }
                    }
                    localStorage.setItem('currentGameCard',JSON.stringify(currentGameCard));
                    localStorage.setItem('drawnCards',JSON.stringify(drawnCards));
                }

                if (hand.length!== 0) handCache = hand;
                localStorage.setItem('handCache',JSON.stringify(handCache));
                localStorage.setItem('Rectangles',JSON.stringify(data2_json.Rectangles));
                localStorage.setItem('data2',JSON.stringify(data2_json));
           

            /* let data3 = await fetch(`http://127.0.0.1:${PORT}/game-result`);
            let data3_json = await data3.json();
            */
        }
        catch(e) {
            console.log(e);
            if(e instanceof TypeError){
                if(e.message == 'Failed to fetch'){
                    clearContainer();
                    CONTAINER.innerHTML = "Please open game!"
                    localStorage.clear();
                }
            }
        }

    }, 1000);
}

function clearContainer() {
    while (CONTAINER.children.length >= 1) {
        CONTAINER.children[0].remove();
    }
}

function isEqual(objA, objB){
    for(let item = 0; item < objA.length; item++){
        if(objA[item] !== objB[item]){
            return false;
        }
    }
    return true;
}

function difference(a,b){
    let res = [];
    for(let i = 0; i < a.length; i++){
        if(b.indexOf(a[i]) === -1) res.push(a[i]);
    }
    for(let i = 0; i < b.length; i++){
        if(a.indexOf(b[i]) === -1) res.push(b[i]);
    }
    return res;
}

checkDeck();

// http://127.0.0.1:{port}/game-result

