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