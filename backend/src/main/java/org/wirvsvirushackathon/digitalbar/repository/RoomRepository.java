package org.wirvsvirushackathon.digitalbar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wirvsvirushackathon.digitalbar.domain.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
}
