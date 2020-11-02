let xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.meteo.lt/v1/places", true);

xhr.onreadystatechange = function () {

    if (this.readyState === 4) {
        var miestai = JSON.parse(xhr.responseText);

        let dataList = document.querySelector('datalist');

        for (let i = 0; i < miestai.length; i++) {

            //sukuriamas tag <option>
            let miestas = document.createElement('option');
            //<option> atributui "value" priskiriamas miesto pavadinimas
            miestas.value=miestai[i].name;
            //prie dataList objekto pridedamas <option>
            dataList.appendChild(miestas);
        }
    }
};

xhr.send();

