var manoAjax = new XMLHttpRequest();

manoAjax.onreadystatechange = function () { // callback f-ja
    if (this.readyState === 4) {
        if (this.status === 200) {
            document.querySelector("aside").innerHTML = this.responseText;
            console.log(this.responseText)
            console.log(this.statusText)
        } else {
            alert(this.statusText)
        }
    }

};

manoAjax.open("GET", "nav/nav.html");

document.querySelector('button.showMenu').onclick = function () { //event'as button'ui onclick
    manoAjax.send();
    document.querySelector('button.showMenu').style.display = "none";
}
