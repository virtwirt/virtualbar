package org.wirvsvirushackathon.digitalbar.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wirvsvirushackathon.digitalbar.domain.Room;
import org.wirvsvirushackathon.digitalbar.repository.RoomRepository;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room createRoom(String name) {
        Room room = new Room(name);

        return roomRepository.save(room);
    }

    @Override
    public Room getRoom(long id) {
        return roomRepository.findById(id).orElse(null);
    }

    @Override
    public Room updateRoom(long id, String name) {
        Room room = roomRepository.getOne(id);
        room.setName(name);
        // save really needed?
        roomRepository.save(room);

        return room;
    }

    @Override
    public void deleteRoom(long id) {
       roomRepository.deleteById(id);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}
