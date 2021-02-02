

const APIKEY = "RGAPI-1baab92c-4b19-4c23-b672-ad64b01db9b9";
const LEADERBOARD = document.querySelector("table#leaderboard");

/*
Servers: asia, americas, europe

*/
function getLeaderboards(server){
    fetch(`https://${server}.api.riotgames.com/lor/ranked/v1/leaderboards?api_key=${APIKEY}`)
    .then(response =>  response.json())
    .then(data => {
        for(let i = 0; i < data.players.length; i++){
            let name = data.players[i].name;
            let rank = parseInt(data.players[i].rank) + 1;
            let lp = data.players[i].lp;
            let tr = document.createElement("tr");
            let td_rank = document.createElement("td");
            let td_name = document.createElement("td");
            let td_lp = document.createElement("td");
            td_rank.innerHTML = rank;
            td_name.innerHTML = name;
            td_lp.innerHTML = lp;
            tr.appendChild(td_rank);
            tr.appendChild(td_name);
            tr.appendChild(td_lp);
            LEADERBOARD.appendChild(tr);

        }

    });
}
getLeaderboards("asia");

function getPlayerId(server,name,tag){
     fetch(`https://${server}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${APIKEY}`)
    .then(response => response.json())
    .then(data => { 
        console.log(data.puuid)
        fetch(`https://${server}.api.riotgames.com/lor/match/v1/matches/by-puuid/${data.puuid}/ids?api_key=${APIKEY}`)
        .then(res => res.json())
        .then(match => console.log(match))
    })
}

console.log(getPlayerId("asia","WillemMorgif","Dave"));