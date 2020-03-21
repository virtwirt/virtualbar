package org.wirvsvirushackathon.digitalbar.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wirvsvirushackathon.digitalbar.domain.Room;
import org.wirvsvirushackathon.digitalbar.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomResource {

    @Autowired
    private RoomService roomService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<Room> createRoom(@RequestParam String name) {
        Room room = roomService.createRoom(name);

        return ResponseEntity.created(null).body(room);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Room> getRoom(@PathVariable long id) {
        return ResponseEntity.ok(roomService.getRoom(id));
    }
}
