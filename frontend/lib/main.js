function create(){
    // Vom Backend holen (Raumanzahl)
    var rooms = 5

    for(var i = 0; i < rooms; i++) {
        // Container hinzufügen
        var obj = createElement("div")
        obj.setAttribute("id", 'c${i}')
        obj.setAttribute("class", "column")
        document.getElementById('row').appendChild(obj)

        // Tisch hinzufügen
        var table = createElement("img")
        table.setAttribute("class", "ui image")
        table.setAttribute("src", "table.jpg")
        table.setAttribute("onclick", "$('.ui.modal').modal('show');")
        document.getElementById('c${i}').appendChild(table)

        // Sitzplätze
        // vom Backend Sitzplätze für entsprechenden Raum holen
        var count = 4
        for(var j = 0; j < count; j++) {
            var seat = createElement("img")
            seat.setAttribute("class", "ui avatar image")
            seat.setAttribute("src", "user.jpg")
            document.getElementById('c${i}').appendChild(seat)
        }
    }
}