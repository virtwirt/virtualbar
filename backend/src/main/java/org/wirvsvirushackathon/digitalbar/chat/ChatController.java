package org.wirvsvirushackathon.digitalbar.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private ChatRoomService chatRoomService;

    @MessageMapping("/chat/{roomId}.sendMessage")
    @SendTo("/room/{roomId}")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat/{roomId}.addUser")
    @SendTo("/room/{roomId}")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor,
                               @DestinationVariable String roomId) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        chatRoomService.addUser(headerAccessor.getSessionId(), chatMessage.getSender(), roomId);
        return chatMessage;
    }
}
