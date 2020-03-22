var backendBase = "https://digitalbar.newhouse.de/backend";

function navigateToBar(barId) {
  return function() {
    window.location.href = 'bar.html?barId=' + barId;
  }
}

function createBars(filter, tags){
   function reqListener () {
        var bars = JSON.parse(this.responseText)
        console.log(bars)
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
                for(var i = 0; i < tags.length; i++) {
                    if(!o.tags.includes(tags[i])) {
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
                        var tagArray = []
                        var index = 0
                        for(var l = 0; l < filteredBars[i].rooms.length; l++) {
                            for(var k = 0; k < filteredBars[i].tags.length; k++) {
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
