package org.wirvsvirushackathon.digitalbar.service;

import org.wirvsvirushackathon.digitalbar.domain.Bar;

import java.util.List;
import java.util.Optional;

public interface BarService {

    List<Bar> findAll();

    Optional<Bar> findById(Long id);

    Bar save(Bar bar);

    void deleteById(Long id);
}
