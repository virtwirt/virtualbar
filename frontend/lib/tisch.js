var backendBase = "https://virtwirt.de/backend";

function displayName(){
   function reqListener () {
        var room = JSON.parse(this.responseText)
        document.getElementById('table').innerHTML = "Tisch " + room.name
   }

   var urlParams = new URLSearchParams(window.location.search);
   var id = urlParams.get('roomId');
   var oReq = new XMLHttpRequest();
   oReq.addEventListener("load", reqListener);
   oReq.open("GET", backendBase + "/rooms/" + id);
   oReq.send();
}
