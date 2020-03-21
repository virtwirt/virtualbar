package org.wirvsvirushackathon.digitalbar.chat;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {
    private Map<String, String> sessionRoomMap = new HashMap<>();

    @Override
    public String getRoomIdForSession(String sessionId) {
        return sessionRoomMap.get(sessionId);
    }

    @Override
    public void addUser(String sessionId, String username, String roomId) {
        sessionRoomMap.put(sessionId, roomId);
        //TODO add user to corresponding domain.Room
    }

    @Override
    public void removeUserBySessionId(String sessionId) {
        sessionRoomMap.remove(sessionId);
        //TODO remove from domain.Room
    }

    @Override
    public void switchRoom(String sessionId, String username, String newRoomId) {
        removeUserBySessionId(sessionId);
        addUser(sessionId, username, newRoomId);
    }
}
