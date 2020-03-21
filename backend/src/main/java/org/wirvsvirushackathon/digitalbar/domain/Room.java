package org.wirvsvirushackathon.digitalbar.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@JsonAutoDetect
@Entity
public class Room {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    public Room() {
    }

    public Room(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
