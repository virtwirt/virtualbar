var backendBase = "https://virtwirt.de/backend";

function navigateToBar(barId) {
  return function() {
    window.location.href = 'bar.html?barId=' + barId;
  }
}

function createBars(filter, tags){
   function reqListener () {
        var bars = JSON.parse(this.responseText)
        document.getElementById("searchbar").addEventListener("input", (event) => {
            if(event.target.value != filter)
            createBars(event.target.value, tags)
        })

        document.getElementById("tags").addEventListener("change", (event) => {
                if(event.target.value != "")
                var newTags = event.target.value.split(",")
                else
                var newTags = []

                if(newTags != tags)
                createBars(filter, newTags)
        })

        // Alle Objekte löschen
        document.getElementById("table").innerHTML = ""

        // Objekte die zum Filter passen einfügen
        if(tags != undefined) {
            var filteredBars = bars.filter((o) => {
                // Alle Tags einer Bar finden
                var tagList = []
                for(var i = 0; i < o.rooms.length; i++) {
                    for(var j = 0; j < o.rooms[i].tags.length; j++) {
                        if(!tagList.includes(o.rooms[i].tags[j])) {
                            tagList[tagList.length] = o.rooms[i].tags[j]
                        }
                    }
                }
                // Filtern, ob Bar die nötigen Tags hat
                for(var i = 0; i < tags.length; i++) {
                    if(!tagList.includes(tags[i])) {
                        return
                    }
                }
                return o
            })
        }
        for(var i = 0; i < filteredBars.length; i++) {
            if(filteredBars[i].name.startsWith(filter)){

                // guests hack
                filteredBars[i].guests = 0;
                for(var l = 0; l < filteredBars[i].rooms.length; l++) {
                  filteredBars[i].guests += filteredBars[i].rooms[l].occupiedSeats;
                }

                var obj = document.createElement("tr")
                obj.setAttribute("id", "item" + i)
                obj.addEventListener("click", navigateToBar(filteredBars[i].id))

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
                        var index = 0
                        var tagArray = []
                        for(var l = 0; l < filteredBars[i].rooms.length; l++) {
                            for(var k = 0; k < filteredBars[i].rooms[l].tags.length; k++) {
                                if(!tagArray.includes(filteredBars[i].rooms[l].tags[k])) {
                                    tagArray[index] = filteredBars[i].rooms[l].tags[k]
                                    index++;
                                }
                            }
                        }
                        for(var m = 0; m < tagArray.length; m++) {
                            text += tagArray[m] + ", "
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

   var oReq = new XMLHttpRequest();
   oReq.addEventListener("load", reqListener);
   oReq.open("GET", backendBase + "/bars");
   oReq.send();
}

function addBar() {
    var bar = {
        id: Math.round(Math.random()* 1000),
        name: document.getElementById('newSearchbar').value,
        rooms: [{
                id: Math.round(Math.random()* 1000),
                name: "Hauptraum",
                maxSeats: 15,
                tags: document.getElementById('newTags').value.split(","),
                occupiedSeats: 0
            },
            {
                id: Math.round(Math.random()* 1000),
                name: "Nebenraum",
                maxSeats: 15,
                tags: document.getElementById('newTags').value.split(","),
                occupiedSeats: 0
            }
        ]
    }

   var oReq = new XMLHttpRequest();
   oReq.open("POST", backendBase + "/bars");
   oReq.setRequestHeader("Content-Type", "application/json");
   oReq.send(bar);
}