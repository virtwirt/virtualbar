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
		createTable('c' + i)
		
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
   }]

    for(var i = 0; i < bars.length; i++) {
        var obj = document.createElement("li")
        obj.setAttribute("id","l" + i)
        obj.setAttribute("onclick", "window.location.href = 'bar.html'")
        document.getElementById("list").appendChild(obj)
        document.getElementById("l" + i).innerHTML = bars[i].name
    }
}

function createTable(containerEle){
	
	var card = document.createElement("div")
    card.setAttribute("class", "card")
	
	var blurCntnr = document.createElement("div")
    blurCntnr.setAttribute("class", "blurring dimmable image")
	
	var dimmer = document.createElement("div")
    dimmer.setAttribute("class", "ui dimmer")
	
	var cntnt = document.createElement("div")
    cntnt.setAttribute("class", "content")
	
	var center = document.createElement("div")
    center.setAttribute("class", "center")
	
	var room = document.createElement("div")
    center.setAttribute("class", "header")
	
	var bla = document.createElement("div")
    bla.setAttribute("class", "ui inverted button")
	bla.innerHTML = "An der Unterhaltung teilnehmen"
	bla.setAttribute("onclick", "window.location.href = 'tisch.html'")
	var table = document.createElement("img")
	table.setAttribute("class", "ui medium image")
    table.setAttribute("src", "table.png")
	
	card.appendChild(blurCntnr)
	blurCntnr.appendChild(dimmer)
	blurCntnr.appendChild(table)
	dimmer.appendChild(cntnt)
	cntnt.appendChild(center)
	center.appendChild(room)
	center.appendChild(bla)
	createTags(center)
	document.getElementById(containerEle).appendChild(card)
	
}

function createTags(container){
	var labelContainer = document.createElement("div")
    labelContainer.setAttribute("class", "ui red labels")

	var labelse = ['Chat', 'Voice', 'Trinkspiele']
	
	for(var i = 0; i < labelse.length; i++) {
		var tag = document.createElement("a")
		tag.setAttribute("class", "ui label")
		tag.innerHTML = labelse[i]
		
		labelContainer.appendChild(tag)
	}
	container.appendChild(labelContainer)
}