function createRooms(){
    // Vom Backend holen (Raumanzahl)
    var rooms = 5

    for(var i = 0; i < rooms; i++) {
        // Container hinzufügen
        var obj = document.createElement("div")
        obj.setAttribute("id", 'c' + i)
        obj.setAttribute("class", "column")
        document.getElementById('row').appendChild(obj)

        // Tisch hinzufügen
        var table = document.createElement("img")
        table.setAttribute("class", "ui image")
        table.setAttribute("src", "table.jpg")
        table.setAttribute("onclick", "window.location.href = 'tisch.html'")
        document.getElementById('c' + i).appendChild(table)

        // Sitzplätze
        // vom Backend Sitzplätze für entsprechenden Raum holen
        var count = 4
        for(var j = 0; j < count; j++) {
            var seat = document.createElement("img")
            seat.setAttribute("class", "ui avatar image")
            seat.setAttribute("src", "user.jpg")
            document.getElementById('c' + i).appendChild(seat)
        }
    }
}

function createBars(){
    // Vom Server holen
    var bars =
    [{
        name:       "Bar1",
        id:         "adhwndwa",
        maxGuests:  20,
        guests:     10
   },
   {
       name:       "Bar1",
       id:         "adhwndwa",
       maxGuests:  20,
       guests:     10
   }]

    for(var i = 0; i < bars.length; i++) {
        var obj = document.createElement("li")
        obj.setAttribute("id","l" + i)
        obj.setAttribute("onclick", "window.location.href = 'bar.html'")
        obj.setAttribute("class", "text")

        var pTemp = document.createElement("p")
        var text = document.createTextNode(bars[i].name + " " + bars[i].guests + "/" + bars[i].maxGuests)

        pTemp.appendChild(text)
        obj.appendChild(pTemp)

        document.getElementById("list").appendChild(obj)
    }
}