package org.wirvsvirushackathon.digitalbar.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wirvsvirushackathon.digitalbar.domain.Room;
import org.wirvsvirushackathon.digitalbar.repository.RoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;


    @Override
    public Optional<Room> findById(long id) {
        return roomRepository.findById(id);
    }

    @Override
    public Room save(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public void deleteById(long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }
}
