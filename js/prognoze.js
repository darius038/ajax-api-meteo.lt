let xhrForecast = new XMLHttpRequest();

const userInput = document.querySelector('input');

userInput.addEventListener("input", getForecast);

let table = document.querySelector('tbody');

function getForecast() {
    table.innerHTML = "";

    let miestoPav = userInput.value;
    let miestoKod = getCityCode(miestoPav);

    //sukuriamas URL su miesto kodu
    let urlForecast = 'https://api.meteo.lt/v1/places/'+miestoKod+'/forecasts/long-term';
    //console.log(urlForecast);

    xhrForecast.open("GET", urlForecast, true);

    xhrForecast.send();

    xhrForecast.onreadystatechange = function () {

        if (xhrForecast.readyState === 4) {
            let orai = JSON.parse(xhrForecast.responseText);

            //console.log(orai);

            let latitude = orai['place']['coordinates']['latitude'];
            let longtitude = orai['place']['coordinates']['longitude'];
            let tokenS= 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

            let mymap = L.map('mapid').setView([latitude, longtitude], 13);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+tokenS, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
            }).addTo(mymap);

            //Uzpildoma lentele su 12 reiksmiu
            for (let i = 0; i < 11; i++) {

                let row = document.createElement('tr');

                //Pirmas stulpelis - laikas
                let date=orai['forecastTimestamps'][i]['forecastTimeUtc'].split(" ");

                row.insertCell(0).innerHTML=date[1];

                //Antras stulpelis - Debesuotumas - i lentele dedama ikona pagal reiksme
                let cond =orai['forecastTimestamps'][i]['conditionCode'];
                let currCond;

                switch (cond) {
                    case 'clear':
                        currCond = "<i class=\"fas fa-sun\"></i>";
                        break;
                    case 'isolated-clouds':
                        currCond = "<i class=\"fas fa-cloud-sun\"></i>";
                        break;
                    case 'scattered-clouds':
                        currCond = "<i class=\"fas fa-cloud-sun\"></i>";
                        break;
                    case 'overcast':
                        currCond = "<i class=\"fas fa-cloud\"></i>";
                        break;
                    case 'light-rain':
                        currCond = "<i class=\"fas fa-cloud-rain\"></i>";
                        break;
                    case 'moderate-rain':
                        currCond = "<i class=\"fas fa-cloud-showers-heavy\"></i>";
                        break;
                    case 'heavy-rain':
                        cond = "<i class=\"fas fa-cloud-showers-heavy\"></i>";
                        break;
                    default:
                        currCond = "<i class=\"fas fa-bell\"></i>";
                        break;
                }

                row.insertCell(1).innerHTML=currCond;
                //Trecias stulpelis - temperatura
                row.insertCell(2).innerHTML=orai['forecastTimestamps'][i]['airTemperature'];
                //Ketvirtas stulpelis - vejo greitis
                row.insertCell(3).innerHTML=orai['forecastTimestamps'][i]['windSpeed'];

                table.appendChild(row);
            }
        }
    };
}

// funkcija paimti miesto koda pagal jo pavadinima
function getCityCode(name){

    let miestai = JSON.parse(xhr.responseText);

    for (let i in miestai){
        if (name===miestai[i].name){
            return miestai[i].code;
        }
    }
}