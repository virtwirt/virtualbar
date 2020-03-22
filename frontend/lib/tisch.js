function setup() {
    var chatMessages = document.getElementsByClass('header')
    for(var i = 0; i < chatMessages.length; i++) {
        chatMessages[i].addEventListener('click', (event) => console.log(event.target.innerHTML))
    }
}