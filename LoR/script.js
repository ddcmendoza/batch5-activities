


const APIKEY = config.MY_API_TOKEN;
const LEADERBOARD = document.querySelector("table#leaderboard");
const SERVERS = ['americas','asia','europe','sea'];
/*
Servers: asia, americas, europe

*/

/*
Collapsible menu
*/
const MENU = document.getElementById('navbarSupportedContent');
const HAMBURGERMENU = document.querySelector('button.navbar-toggler');

HAMBURGERMENU.addEventListener('click', ()=>{
    MENU.classList.toggle('show');
});

function getLeaderboards(server){
    fetch(`https://${server}.api.riotgames.com/lor/ranked/v1/leaderboards?api_key=${APIKEY}`)
    .then(response =>  {
        clearBoard(server);
        return response.json()
    })
    .then(data => {
        for(let i = 0; i < data.players.length; i++){
            let name = data.players[i].name;
            let rank = parseInt(data.players[i].rank) + 1;
            let lp = data.players[i].lp;
            let tr = document.createElement("tr");
            let td_rank = document.createElement("th");
            let td_name = document.createElement("td");
            let td_lp = document.createElement("td");
            td_rank.scope = "row";
            td_rank.innerHTML = rank;
            td_name.innerHTML = name;
            td_lp.innerHTML = lp;
            tr.appendChild(td_rank);
            tr.appendChild(td_name);
            tr.appendChild(td_lp);

            LEADERBOARD.children[0].appendChild(tr);

        }

    });
}

function clearBoard(server){
    for(let i = 0; i < SERVERS.length; i++){
        document.getElementById(`${SERVERS[i]}`).classList.remove('active');
    }
    while(LEADERBOARD.children[0].children.length > 1){
        LEADERBOARD.children[0].children[1].remove();
    }
    let active = document.getElementById(`${server}`);
    active.classList.toggle("active");
}

