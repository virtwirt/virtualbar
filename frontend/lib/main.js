function create(){
    // Vom Backend holen (Raumanzahl)
    var rooms = 5

    for(var i = 0; i < rooms; i++) {
        // Container hinzufügen
        var obj = document.createElement("div")
        obj.setAttribute("id", 'c${i}')
        obj.setAttribute("class", "column")
        document.getElementById('row').appendChild(obj)

        // Tisch hinzufügen
        var table = document.createElement("img")
        table.setAttribute("class", "ui image")
        table.setAttribute("src", "table.jpg")
        table.setAttribute("onclick", "window.location.href = 'tisch.html'")
        document.getElementById('c${i}').appendChild(table)

        // Sitzplätze
        // vom Backend Sitzplätze für entsprechenden Raum holen
        var count = 4
        for(var j = 0; j < count; j++) {
            var seat = document.createElement("img")
            seat.setAttribute("class", "ui avatar image")
            seat.setAttribute("src", "user.jpg")
            document.getElementById('c${i}').appendChild(seat)
        }
    }
}