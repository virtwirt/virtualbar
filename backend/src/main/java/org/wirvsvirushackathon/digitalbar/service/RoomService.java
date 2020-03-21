package org.wirvsvirushackathon.digitalbar.service;

import org.wirvsvirushackathon.digitalbar.domain.Room;

import java.util.List;

public interface RoomService {
    Room createRoom(String name);
    Room getRoom(long id);
    Room updateRoom(long id, String name);
    void deleteRoom(long id);

    List<Room> getAllRooms();
}
