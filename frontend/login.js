function setup() {
    document.getDocumentById('login').addEventListener('click', (event) => {
        process()
    })
}

function process() {
    // Daten für backend bereitstellen
    var user = document.getElementById('user').value
    var pw = document.getElementById('password').value


}