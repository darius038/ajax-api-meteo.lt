var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.meteo.lt/v1/places", true);

var sarasas;
xhr.onreadystatechange = function () { // callback f-ja
    if (this.readyState === 4) {
        var miestai = JSON.parse(xhr.responseText);

        console.log(miestai);

        for (let i = 0; i < miestai.length; i++) {

            sarasas += '<option value="'+miestai[i].name+'">';

        }
        console.log(sarasas);
        document.querySelector('datalist').innerHTML = sarasas;

    }
};

xhr.send();

