let matchHistory;
async function getHistory(server,name,tag){
        console.log('fetching');
        matchHistory = [];
        clearHistory();
        PROFILEHEADER.innerHTML = `${name}#${tag}'s ${numMatches} Recent Matches in ${server.toUpperCase()} Server`;
        let result = await fetch(`https://${server}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${APIKEY}`);
        let response = await result.json();
        let puuid = response.puuid;
        let res = await fetch(`https://${server}.api.riotgames.com/lor/match/v1/matches/by-puuid/${puuid}/ids?api_key=${APIKEY}`);
        let matches = await res.json();
        for (let i = 0; i < matches.length && i < numMatches; i++){
            let matchID = matches[i];
            let match = await fetch(`https://${server}.api.riotgames.com/lor/match/v1/matches/${matchID}?api_key=${APIKEY}`);
            let parsedMatch = await match.json();
            matchHistory.push(await parsedMatch);
        }
        for(let i = 0; i < matchHistory.length; i++ ){
            let p1 = matchHistory[i].info.players[0];
            let p2 = matchHistory[i].info.players[1];
            
            let player1 = await fetch(`https://${server}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${p1.puuid}?api_key=${APIKEY}`);
            let player1_json = await player1.json();
            let player1_tL = player1_json.tagLine;
            let player1_name = player1_json.gameName;
            
            let player2 = await fetch(`https://${server}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${p2.puuid}?api_key=${APIKEY}`);
            let player2_json = await player2.json();
            let player2_tL = player2_json.tagLine;
            let player2_name = player2_json.gameName;

            let div_match = document.createElement('div');
            let div_match_header = document.createElement('div');
            let div_match_details = document.createElement('div');

            let mode = matchHistory[i].info.game_mode;
            let type = matchHistory[i].info.game_type;
            let tc = matchHistory[i].info.total_turn_count;
            let datetime = matchHistory[i].info.game_start_time_utc.split('T');
            let date = datetime[0];
            let time = datetime[1].slice(0,8);
            let winner;
            if (p1.game_outcome == 'win'){
                winner = await player1_name;
            }
            else if(p2.game_outcome == 'win'){
                winner = await player2_name;
            }
            else {
                winner = 'Draw';
            }
            
            let mode_con = document.createElement('div');
            let type_con = document.createElement('div');
            let date_con = document.createElement('div');
            let time_con = document.createElement('div');
            let turncount = document.createElement('div');
            let outcome = document.createElement('div');

            mode_con.innerHTML = `Game Mode: ${mode}`;
            type_con.innerHTML = `Game Type: ${type}`;
            date_con.innerHTML = `Date: ${date}`;
            time_con.innerHTML = `Time: ${time} UTC`;
            turncount.innerHTML = `Total Turncount: ${tc}`;
            outcome.innerHTML =  (winner !=='Draw')?`${winner} WINS!`:`${winner}`;

            div_match_details.appendChild(mode_con);
            div_match_details.appendChild(type_con);
            div_match_details.appendChild(date_con);
            div_match_details.appendChild(time_con);
            div_match_details.appendChild(turncount);
            div_match_details.appendChild(outcome);

            div_match.classList.add('container-fluid');
            div_match.classList.add('rounded');
            div_match.classList.add('matches');

 
            div_match_header.classList.add('container-fluid');
            div_match_details.classList.add('container-fluid');

            if(winner === name){
                div_match.classList.add('bg-success');
            }
            else if(winner === 'Draw'){
                div_match.classList.add('bg-dark');
            }
            else{
                div_match.classList.add('bg-danger');
            }
            div_match.classList.add('bg-gradient');

            div_match.classList.add('text-light');
            div_match.classList.add('p-2');
            div_match.classList.add('mb-1');
            div_match.classList.add('w-75');

            let a1 = document.createElement('button');
            let a2 = document.createElement('button');
            let vs = document.createElement('span');

            let f1_1 = document.createElement('img');
            let f1_2 = document.createElement('img');
            let f2_1 = document.createElement('img');
            let f2_2 = document.createElement('img');

            f1_1.src = `img/factions/icon-${FACTIONS[p1.factions[0]]}.png`;
            f1_2.src = `img/factions/icon-${FACTIONS[p1.factions[1]]}.png`;
            f2_1.src = `img/factions/icon-${FACTIONS[p2.factions[0]]}.png`;
            f2_2.src = `img/factions/icon-${FACTIONS[p2.factions[1]]}.png`;

            let c1 = document.createElement('i');
            let c2 = document.createElement('i');
            let b_c1 = document.createElement('button');
            let b_c2 = document.createElement('button');

            c1.classList.add('bi');
            c1.classList.add('bi-clipboard');
            c2.classList.add('bi');
            c2.classList.add('bi-clipboard');

            b_c1.appendChild(c1);
            b_c2.appendChild(c2);
            
            b_c1.classList.add('btn');
            b_c2.classList.add('btn');
            b_c1.classList.add('btn-light');
            b_c2.classList.add('btn-light');
            b_c1.classList.add('mx-2');
            b_c2.classList.add('mx-2');

            vs.innerHTML = " vs ";
             
            a1.classList.add('btn');
            a1.classList.add('btn-secondary');
            a1.classList.add('mx-2');

            a2.classList.add('btn');
            a2.classList.add('btn-secondary');
            a2.classList.add('mx-2');
            
            a1.innerHTML = `${player1_name}#${player1_tL} `;
            a2.innerHTML = `${player2_name}#${player2_tL}`;

            b_c1.addEventListener('click',()=>{
                navigator.clipboard.writeText(p1.deck_code).then( ()=>{
                    console.log(p1.deck_code)
                });
            });
            b_c2.addEventListener('click',()=>{
                navigator.clipboard.writeText(p2.deck_code).then( () =>{
                    console.log(p2.deck_code);
                });
            });

            a1.addEventListener('click',()=>{
                console.log('working 1');
                GAME_ID.value = player1_name;
                TAGLINE.value = player1_tL;
                sleep(1000).then(getHistory(server,player1_name,player1_tL.toLowerCase()).catch(alert));

            });
            a2.addEventListener('click',()=>{
                console.log('working 2');
                GAME_ID.value = player2_name;
                TAGLINE.value = player2_tL;
                sleep(1000).then(getHistory(server,player2_name,player2_tL.toLowerCase()).catch(alert));

            });
            
            div_match_header.appendChild(b_c1);
            div_match_header.appendChild(f1_1);
            div_match_header.appendChild(f1_2);
            div_match_header.appendChild(a1);
            div_match_header.appendChild(vs);
            div_match_header.appendChild(a2);
            div_match_header.appendChild(f2_1);
            div_match_header.appendChild(f2_2);
            div_match_header.appendChild(b_c2);

            div_match.appendChild(div_match_header);
            div_match.appendChild(div_match_details);

            MATCH_HISTORY_CONTAINER.appendChild(div_match)
        }
        
}
    /*
    SAMPLE RESPONSE from lor match v1 endpoint
    {
            "metadata": {
                "data_version": "2",
                "match_id": "3288f994-2875-47a7-abcc-ff39c0746833",
                "participants": [
                    "-IS-1KSVE0BeOxIHy5TrBmqbvFpR8fsynE9plV741HLoDlK7nw_fzUy3-TMwYacpsZT8EMsbMCcj5g",
                    "bJNZrEhQycUH2JrrgUjSgZrEOu0gDdCKxyV5_iKH2uRb_FAPANRPhmADwpEfggnbcNLSh8AoV6iD1A"
                ]
            },
            "info": {
                "game_mode": "Constructed",
                "game_type": "Ranked",
                "game_start_time_utc": "2021-02-09T16:37:13.0187743+00:00",
                "game_version": "live_2_1_18",
                "players": [
                    {
                        "puuid": "-IS-1KSVE0BeOxIHy5TrBmqbvFpR8fsynE9plV741HLoDlK7nw_fzUy3-TMwYacpsZT8EMsbMCcj5g",
                        "deck_id": "51c42417-e13f-4af0-a8ed-f225110b9581",
                        "deck_code": "CICACAQBAIBAGAITCYBQGCKUKZLQIAIBBQKCCMQDAEAQCAYBAIAQIAQDBEK52AICAEBQCBABAMEQ2",
                        "factions": [
                            "faction_Freljord_Name",
                            "faction_MtTargon_Name"
                        ],
                        "game_outcome": "loss",
                        "order_of_play": 0
                    },
                    {
                        "puuid": "bJNZrEhQycUH2JrrgUjSgZrEOu0gDdCKxyV5_iKH2uRb_FAPANRPhmADwpEfggnbcNLSh8AoV6iD1A",
                        "deck_id": "49406737-e093-4876-9206-3404f61ee7e9",
                        "deck_code": "CIBQEAQGDITAEAYGA4IQMAYJEMZUSVOZAHNQCAIEAMESUVDAMIBACAQGFIAQGCKL",
                        "factions": [
                            "faction_Bilgewater_Name",
                            "faction_MtTargon_Name"
                        ],
                        "game_outcome": "win",
                        "order_of_play": 1
                    }
                ],
                "total_turn_count": 37
            }
        }
    */
    
   const SERVER = document.getElementById('serverDrop');
   const GAME_ID = document.getElementById('gameID');
   const TAGLINE = document.getElementById('tagLine');
   const MATCH_HISTORY_CONTAINER = document.getElementById('matchHistoryContainer');
   const PROFILEHEADER = document.getElementById('profileHeader');
   const ALERT_WINDOW = document.getElementById('wrongInput');
   const ERROR_CONTAINER = document.getElementById('errors');

   const NUMBER_MATCHES = document.getElementById('numberMatches');

   const FACTIONS = {
       'faction_Freljord_Name':'freljord',
       'faction_MtTargon_Name':'targon',
       'faction_Bilgewater_Name':'bilgewater',
       'faction_Demacia_Name':'demacia',
       'faction_Ionia_Name':'ionia',
       'faction_Noxus_Name':'noxus',
       'faction_ShadowIsles_Name':'shadowisles',
       'faction_Piltover_Name':'piltoverzaun'
   }
   
   let numMatches = 2;
   
   document.getElementById('serverDrop').addEventListener('click',()=>{
       document.getElementById('dropDown').classList.toggle('show');
    });
    document.getElementById('americas').addEventListener('click',()=>{
        document.getElementById('dropDown').classList.toggle('show');
        document.getElementById('serverDrop').innerHTML = 'Americas';
    });
    document.getElementById('asia').addEventListener('click',()=>{
        document.getElementById('dropDown').classList.toggle('show');
        document.getElementById('serverDrop').innerHTML = 'Asia';
        
    });
    document.getElementById('europe').addEventListener('click',()=>{
        document.getElementById('dropDown').classList.toggle('show');
        document.getElementById('serverDrop').innerHTML = 'Europe';
        
    });
    
    
    
    //getHistory("europe","Szychu","euw");
document.querySelector('button#searchMatches').addEventListener('click', ()=>{
    numMatches = parseInt(NUMBER_MATCHES.value);

    if(GAME_ID.value !== '' && TAGLINE.value !== '' && SERVER.innerHTML != 'Server' && NUMBER_MATCHES.value != '' && (numMatches >= 1 && numMatches <= 10) && !isNaN(numMatches)){
        getHistory(SERVER.innerHTML,GAME_ID.value,TAGLINE.value).catch(e =>{
            if(e.name !== "AbortError"){
                console.log(e);
            }
        });
    }
    else{
        let modal = new bootstrap.Modal(ALERT_WINDOW,{keyboard:false})
        clearErrors();
        if(GAME_ID.value=== ''){
            let e = document.createElement('div');
            e.innerHTML = 'Gamer ID is blank!';
            ERROR_CONTAINER.appendChild(e);
        }
        if(TAGLINE.value=== ''){
            let e = document.createElement('div');
            e.innerHTML = 'Tagline is blank!';
            ERROR_CONTAINER.appendChild(e);
        }
        if(SERVER.innerHTML=== 'Server'){
            let e = document.createElement('div');
            e.innerHTML = 'Please select a server!';
            ERROR_CONTAINER.appendChild(e);
        }
        if(NUMBER_MATCHES.value=== ''){
            let e = document.createElement('div');
            e.innerHTML = 'Please input how many matches to show!';
            ERROR_CONTAINER.appendChild(e);
        }
        if(isNaN(numMatches)){
            let e = document.createElement('div');
            e.innerHTML = 'Please input valid number for matches to show!';
            ERROR_CONTAINER.appendChild(e);
        }
        if(!(numMatches >= 1 && numMatches <= 10)){
            let e = document.createElement('div');
            e.innerHTML = 'Please input valid number for matches to show! (min 1, max 10)';
            ERROR_CONTAINER.appendChild(e);
        }
        modal.toggle();
    }
});

function clearHistory(){
    while(MATCH_HISTORY_CONTAINER.children.length >= 1){
        MATCH_HISTORY_CONTAINER.children[0].remove();
    }
}

function clearErrors(){
    while(ERROR_CONTAINER.children.length >= 1){
        ERROR_CONTAINER.children[0].remove();
    }
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
