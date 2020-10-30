var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () { // callback f-ja
    if (this.readyState === 4) {
        var mokiniai = JSON.parse(xhr.responseText);

        console.log(mokiniai);

        var sarasas = '<ul>';

        for (let i = 0; i < mokiniai.length; i++) {
            if (mokiniai[i].lokacija === true) {
                sarasas += '<li class="bg-success">';
            } else {
                sarasas += '<li class="bg-danger">';
            }

            sarasas += mokiniai[i].vardas;
            sarasas += '</li>';
        }

        sarasas += '</ul>';
        document.querySelector('.mokiniai').innerHTML = sarasas;

    }
};


    xhr.open("GET", "duomenys/mokiniai.json");

    xhr.send();
