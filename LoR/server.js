const AMERICAS = document.getElementById('americasServer');
const ASIA = document.getElementById('asiaServer');
const EUROPE = document.getElementById('europeServer');
const SEA = document.getElementById('seaServer');

async function getStatus(){
    let americas_status = await fetch(`https://americas.api.riotgames.com/lor/status/v1/platform-data?api_key=${APIKEY}`);
    let americas_status_json = await americas_status.json();
    let americas_status_maint = await americas_status_json.maintenances;
    let americas_status_incidents = await americas_status_json.incidents;

    if (americas_status_incidents.length === 0 && americas_status_maint.length === 0){
        let box = document.createElement('div');
        box.classList.add('container');
        box.classList.add('bg-success');
        box.classList.add('text-light');
        box.classList.add('rounded');
        box.classList.add('m-2');
        box.innerHTML = 'Server Available';
        AMERICAS.appendChild(box);
    }
    else{
        let box = document.createElement('div');
        box.classList.add('container');
        box.classList.add('bg-danger');
        box.classList.add('text-light');
        box.classList.add('rounded');
        box.classList.add('m-2');
        box.innerHTML = 'Server Unvailable';
        AMERICAS.appendChild(box);
    }

    
    let asia_status = await fetch(`https://asia.api.riotgames.com/lor/status/v1/platform-data?api_key=${APIKEY}`);
    let asia_status_json = await asia_status.json();
    let asia_status_maint = await asia_status_json.maintenances;
    let asia_status_incidents = await asia_status_json.incidents;

    if (asia_status_incidents.length === 0 && asia_status_maint.length === 0){
        let box = document.createElement('div');
        box.classList.add('container');
        box.classList.add('bg-success');
        box.classList.add('text-light');
        box.classList.add('m-2');
        box.classList.add('rounded');
        box.innerHTML = 'Server Available';
        ASIA.appendChild(box);
    }
    else{
        let box = document.createElement('div');
        box.classList.add('container');
        box.classList.add('bg-danger');
        box.classList.add('text-light');
        box.classList.add('rounded');
        box.classList.add('m-2');
        box.innerHTML = 'Server Unvailable';
        ASIA.appendChild(box);
    }

    let europe_status = await fetch(`https://europe.api.riotgames.com/lor/status/v1/platform-data?api_key=${APIKEY}`);
    let europe_status_json = await europe_status.json();
    let europe_status_maint = await europe_status_json.maintenances;
    let europe_status_incidents = await europe_status_json.incidents;

    if (europe_status_incidents.length === 0 && europe_status_maint.length === 0){
        let box = document.createElement('div');
        box.classList.add('container');
        box.classList.add('bg-success');
        box.classList.add('text-light');
        box.classList.add('rounded');
        box.classList.add('m-2');
        box.innerHTML = 'Server Available';
        EUROPE.appendChild(box);
    }
    else{
        let box = document.createElement('div');
        box.classList.add('container');
        box.classList.add('bg-danger');
        box.classList.add('text-light');
        box.classList.add('rounded');
        box.classList.add('m-2');
        box.innerHTML = 'Server Unvailable';
        EUROPE.appendChild(box);
    }

    let sea_status = await fetch(`https://americas.api.riotgames.com/lor/status/v1/platform-data?api_key=${APIKEY}`);
    let sea_status_json = await sea_status.json();
    let sea_status_maint = await sea_status_json.maintenances;
    let sea_status_incidents = await sea_status_json.incidents;

    if (sea_status_incidents.length === 0 && sea_status_maint.length === 0){
        let box = document.createElement('div');
        box.classList.add('container');
        box.classList.add('bg-success');
        box.classList.add('text-light');
        box.classList.add('rounded');
        box.classList.add('m-2');
        box.innerHTML = 'Server Available';
        SEA.appendChild(box);
    }
    else{
        let box = document.createElement('div');
        box.classList.add('container');
        box.classList.add('bg-danger');
        box.classList.add('text-light');
        box.classList.add('rounded');
        box.classList.add('m-2');
        box.innerHTML = 'Server Unvailable';
        SEA.appendChild(box);
    }

}

getStatus();