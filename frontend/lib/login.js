function setup() {
}

function process() {
    // Daten für backend bereitstellen
    var user = document.getElementById('user').value
    var pw = document.getElementById('password').value

    // Abfrage am Backend
    var isPasswordCorrect = true
    if(isPasswordCorrect) {
        // Cockie erstllen

        window.location.href = "barliste.html"
    } else {
        document.getElementById('error').style.visibility = "visible"
    }
}