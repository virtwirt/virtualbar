package org.wirvsvirushackathon.digitalbar.service;

import org.wirvsvirushackathon.digitalbar.domain.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {

    Optional<Room> findById(long id);

    Room save(Room room);

    void deleteById(long id);

    List<Room> findAll();
}
