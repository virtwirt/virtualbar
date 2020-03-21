var backendBase = "https://digitalbar.newhouse.de/backend";

function createRooms(){
    // get rooms
    function reqListener () {
      var rooms = JSON.parse(this.responseText);
      for(var i = 0; i < rooms.length; i++) {
          var room = rooms[i];

          // Container hinzufügen
          var obj = document.createElement("div")
          obj.setAttribute("id", rooms[i].name)
          obj.setAttribute("class", "column")
          document.getElementById('row').appendChild(obj)

          // Tisch hinzufügen
          var table = document.createElement("img")
          table.setAttribute("class", "ui image")
          table.setAttribute("src", "table.jpg")
          table.setAttribute("onclick", "window.location.href = 'tisch.html'")
          createTable(rooms[i].name)

          // Sitzplätze
          // vom Backend Sitzplätze für entsprechenden Raum holen
          //var count = room.maxSeats;
          var count = 4
          for(var j = 0; j < count; j++) {
              var seat = document.createElement("img")
              seat.setAttribute("class", "ui avatar image")
              seat.setAttribute("src", "user.jpg")
              document.getElementById(rooms[i].name).appendChild(seat)
          }
      }
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", backendBase + "/rooms");
    oReq.send();



}

function createBars(filter){
    // Vom Server holen
    var bars =
    [{
        name:       "Bar1",
        id:         "adhwndwa",
        maxGuests:  20,
        guests:     10
   },
   {
       name:       "Bar2",
       id:         "adhwndwa",
       maxGuests:  30,
       guests:     8
   }]

    document.getElementById("searchbar").addEventListener("input", (event) => {
        if(event.target.value != filter)
        createBars(event.target.value)
    })
    // Alle Objekte löschen
    document.getElementById("table").innerHTML = ""

    // Objekte die zum Filter passen einfügen
    for(var i = 0; i < bars.length; i++) {
        if(bars[i].name.startsWith(filter)){
            var obj = document.createElement("tr")
            obj.setAttribute("id", "item" + i)
            obj.setAttribute("onclick", "window.location.href = 'bar.html'")

            for(var j = 0; j < 3; j++) {
                var td = document.createElement("td")

                var text
                switch(j) {
                    case 0:
                    text = bars[i].name
                    break
                    case 1:
                    text = bars[i].guests + "/" + bars[i].maxGuests
                    break
                    case 2:
                    text = ""
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