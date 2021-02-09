function getPlayerId(server,name,tag){
     fetch(`https://${server}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${APIKEY}`)
    .then(response => response.json())
    .then(data => { 
        console.log(data.puuid)
        fetch(`https://${server}.api.riotgames.com/lor/match/v1/matches/by-puuid/${data.puuid}/ids?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(match => {
            
            for(let i = 0; (i < match.length) && (i < 5); i++){
                fetch(`https://${server}.api.riotgames.com/lor/match/v1/matches/${match[i]}?api_key=${APIKEY}`)
                .then(battle => battle.json())
                .then(result => 
                    {
                        console.log(result);

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
                    })
            }
        })
    })
}

//getPlayerId("europe","Szychu","euw");

document.getElementById('serverDrop').addEventListener('click',()=>{
    document.getElementById('dropDown').classList.toggle('show');
})
document.getElementById('americas').addEventListener('click',()=>{
    document.getElementById('dropDown').classList.toggle('show');
    document.getElementById('serverDrop').innerHTML = 'Americas';
})
document.getElementById('asia').addEventListener('click',()=>{
    document.getElementById('dropDown').classList.toggle('show');
    document.getElementById('serverDrop').innerHTML = 'Asia';

})
document.getElementById('europe').addEventListener('click',()=>{
    document.getElementById('dropDown').classList.toggle('show');
    document.getElementById('serverDrop').innerHTML = 'Europe';

})