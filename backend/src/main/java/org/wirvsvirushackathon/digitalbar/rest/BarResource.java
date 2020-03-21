package org.wirvsvirushackathon.digitalbar.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wirvsvirushackathon.digitalbar.domain.Bar;
import org.wirvsvirushackathon.digitalbar.service.BarService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bars")
public class BarResource {

    @Autowired
    private BarService barService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Bar>> getAll() {
        return ResponseEntity.ok(barService.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Bar> create(@RequestBody Bar bar) {
        return ResponseEntity.ok(barService.save(bar));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Bar> findById(@PathVariable long id) {
        Optional<Bar> bar = barService.findById(id);
        if (!bar.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(bar.get());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Bar> update(@PathVariable long id, @RequestBody Bar bar) {
        if (!barService.findById(id).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(barService.save(bar));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable long id) {
        if (!barService.findById(id).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        barService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
