var backendBase = "https://digitalbar.newhouse.de/backend";

function navigateToRoom(roomId) {
  return function() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('barId');
    window.location.href = 'tisch.html?barId=' + id + '&roomId=' + roomId;
  }
}

function createRooms(){
    // get rooms
    function reqListener () {
      var rooms = JSON.parse(this.responseText).rooms;
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
          createTable(rooms[i])

          // Sitzplätze
          // vom Backend Sitzplätze für entsprechenden Raum holen
          //var count = room.maxSeats;
          var count = rooms[i].occupiedSeats
          for(var j = 0; j < count; j++) {
              var seat = document.createElement("img")
              seat.setAttribute("class", "ui avatar image")
              seat.setAttribute("src", "user.jpg")
              document.getElementById(rooms[i].name).appendChild(seat)
          }
      }
    }

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('barId');
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", backendBase + "/bars/" + id);
    oReq.send();

}

function createTable(room){

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

	var roomElem = document.createElement("div")
  center.setAttribute("class", "header")

	var bla = document.createElement("div")
  bla.setAttribute("class", "ui inverted button")
	bla.innerHTML = "An der Unterhaltung teilnehmen"
	bla.addEventListener("click", navigateToRoom(room.id))
	var table = document.createElement("img")
	table.setAttribute("class", "ui medium image")
  table.setAttribute("src", "table.png")

	card.appendChild(blurCntnr)
	blurCntnr.appendChild(dimmer)
	blurCntnr.appendChild(table)
	dimmer.appendChild(cntnt)
	cntnt.appendChild(center)
	center.appendChild(roomElem)
	center.appendChild(bla)
	createTags(center, room.tags)
	document.getElementById(room.name).appendChild(card)

}

function createTags(container, tags){
	var labelContainer = document.createElement("div")
  labelContainer.setAttribute("class", "ui red labels")

	var labelse = tags

	for(var i = 0; i < labelse.length; i++) {
		var tag = document.createElement("a")
		tag.setAttribute("class", "ui label")
		tag.innerHTML = labelse[i]

		labelContainer.appendChild(tag)
	}
	container.appendChild(labelContainer)
}

createRooms();
