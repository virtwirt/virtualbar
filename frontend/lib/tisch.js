var backendBase = "https://virtwirt.de/backend";

function displayName(){
   function reqListener () {
        var room = JSON.parse(this.responseText)
        document.getElementById('table').innerHTML = 'Tisch "' + room.name + '"'
        if(room.musicUrl !== undefined && room.musicUrl !== null) {
          document.getElementById('audio-source').src = room.musicUrl;
        }
        document.getElementById('audio-player').volume = 0.35;
   }

   var urlParams = new URLSearchParams(window.location.search);
   var id = urlParams.get('roomId');
   var oReq = new XMLHttpRequest();
   oReq.addEventListener("load", reqListener);
   oReq.open("GET", backendBase + "/rooms/" + id);
   oReq.send();
}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
