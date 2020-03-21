package org.wirvsvirushackathon.digitalbar.chat;

import com.sun.istack.Nullable;

public interface ChatRoomService {
    @Nullable
    public String getRoomIdForSession(String sessionId);
    public void addUser(String sessionId, String username, String roomId);
    public void removeUserBySessionId(String sessionId);
    public void switchRoom(String sessionId, String username, String newRoomId);
}
