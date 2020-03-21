var backendBase = "https://digitalbar.newhouse.de/backend";

function createRooms(){
    // get rooms
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', backendBase + "/rooms", true);

    xhttp.onload = function() {
        var rooms = JSON.parse(this.responseText);
        for(var i = 0; i < rooms.length; i++) {
            var room = rooms[i];

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
            //var count = room.maxSeats;
            var count = 4
            for(var j = 0; j < count; j++) {
                var seat = document.createElement("img")
                seat.setAttribute("class", "ui avatar image")
                seat.setAttribute("src", "user.jpg")
                document.getElementById('c' + i).appendChild(seat)
            }
        }

    }

    xhttp.send();
/*
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
    }*/
}

function createBars(filter, tags){
    // Vom Server holen
    var bars =
    [{
        name:       "Bar1",
        id:         "adhwndwa",
        maxGuests:  20,
        guests:     10,
        tags: ["Spiele","Voicechat"]
   },
   {
       name:       "Bar2",
       id:         "adhwndwa",
       maxGuests:  30,
       guests:     8,
       tags: ["Spiele","Videochat"]
   }]

    document.getElementById("searchbar").addEventListener("input", (event) => {
        if(event.target.value != filter)
        createBars(event.target.value, tags)
    })

    document.getElementById("tags").addEventListener("change", (event) => {
            var newTags = event.target.value.split(",")
            if(newTags != tags)
            createBars(filter, newTags)
    })

    // Alle Objekte löschen
    document.getElementById("table").innerHTML = ""

    // Objekte die zum Filter passen einfügen
    var filteredBars = bars.filter((o) => {
        for(var i = 0; i < tags.length; i++) {
            if(!o.tags.includes(tags[i])) {
                return
            }
        }
        return o
    })
    console.log(filteredBars)
    for(var i = 0; i < filteredBars.length; i++) {
        if(filteredBars[i].name.startsWith(filter)){
            var obj = document.createElement("tr")
            obj.setAttribute("id", "item" + i)
            obj.setAttribute("onclick", "window.location.href = 'bar.html'")

            for(var j = 0; j < 3; j++) {
                var td = document.createElement("td")

                var text
                switch(j) {
                    case 0:
                    text = filteredBars[i].name
                    break
                    case 1:
                    text = filteredBars[i].guests + "/" + filteredBars[i].maxGuests
                    break
                    case 2:
                    text = ""
                    for(var j = 0; j < filteredBars[i].tags.length; j++) {
                        text += filteredBars[i].tags[j] + ", "
                    }
                    text = text.substring(0, text.length - 2)
                    break
                }
                td.appendChild(document.createTextNode(text))

                obj.appendChild(td)
            }
            document.getElementById("table").appendChild(obj)
        }
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