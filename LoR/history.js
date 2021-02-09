function getPlayerId(server,name,tag){
     fetch(`https://${server}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${APIKEY}`)
    .then(response => response.json())
    .then(data => { 
        console.log(data.puuid)
        fetch(`https://${server}.api.riotgames.com/lor/match/v1/matches/by-puuid/${data.puuid}/ids?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(match => {
            
            for(let i = 0; (i < match.length) && (i<10); i++){
                fetch(`https://${server}.api.riotgames.com/lor/match/v1/matches/${match[i]}?api_key=${APIKEY}`)
                .then(battle => battle.json())
                .then(result => console.log(result))
            }
        })
    })
}

getPlayerId("europe","Szychu","euw");
