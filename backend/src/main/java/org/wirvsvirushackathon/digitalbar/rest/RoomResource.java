package org.wirvsvirushackathon.digitalbar.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wirvsvirushackathon.digitalbar.domain.Room;
import org.wirvsvirushackathon.digitalbar.service.RoomService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
public class RoomResource {

    @Autowired
    private RoomService roomService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<Room> create(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.save(room));
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Room>> findAll() {
        return ResponseEntity.ok(roomService.findAll());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Room> getRoom(@PathVariable long id) {
        Optional<Room> room = roomService.findById(id);
        if (!room.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(room.get());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Room> update(@PathVariable long id, @RequestBody Room room) {
        if (!roomService.findById(id).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(roomService.save(room));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable long id) {
        if (!roomService.findById(id).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        roomService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
