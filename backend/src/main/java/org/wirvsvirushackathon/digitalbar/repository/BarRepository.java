package org.wirvsvirushackathon.digitalbar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wirvsvirushackathon.digitalbar.domain.Bar;

@Repository
public interface BarRepository extends JpaRepository<Bar, Long> {
}
