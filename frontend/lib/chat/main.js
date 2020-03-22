'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var userNameButton = document.querySelector('#username-button');
var messageButton = document.querySelector('#send-button');

var backendBase = "https://digitalbar.newhouse.de/backend";

var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS(backendBase + '/chat');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/room/1', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat/1.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat/1.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('div');
        messageElement.classList.add('item');

    var userIconElement = document.createElement('img');
        userIconElement.classList.add('ui');
        userIconElement.classList.add('avatar');
        userIconElement.classList.add('image');
        userIconElement.setAttribute('src', 'user.jpg')
        userIconElement.setAttribute('onclick', 'addFriend(' + message.sender + ')')
    var msgContentElement = document.createElement('div');
        msgContentElement.classList.add('content');

    messageElement.appendChild(userIconElement);
    messageElement.appendChild(msgContentElement);

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';

        var userNameElement = document.createElement('a');
            userNameElement.classList.add('header');
            userNameElement.innerHTML = message.sender;
        var msgElement = document.createElement('div');
            msgElement.classList.add('description');
            msgElement.innerHTML = 'ist jejöint';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
        var userNameElement = document.createElement('a');
            userNameElement.classList.add('header');
            userNameElement.innerHTML = message.sender;
        var msgElement = document.createElement('div');
            msgElement.classList.add('description');
            msgElement.innerHTML = 'ist wech!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        var userNameElement = document.createElement('a');
            userNameElement.classList.add('header');
            userNameElement.innerHTML = message.sender;
        var msgElement = document.createElement('div');
            msgElement.classList.add('description');
            msgElement.innerHTML = message.content;

        //messageElement.appendChild(avatarElement);

       // var usernameElement = document.createElement('span');
        //var usernameText = document.createTextNode(message.sender);
        //usernameElement.appendChild(usernameText);

    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    msgContentElement.appendChild(userNameElement);
    msgContentElement.appendChild(msgElement);

    messageArea.appendChild(messageElement);
    var scrolli = document.getElementsByClassName("unterscrolli")[0];
    scrolli.scrollTop = scrolli.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

messageButton.addEventListener('click', sendMessage, true)
userNameButton.addEventListener('click', connect, true)
