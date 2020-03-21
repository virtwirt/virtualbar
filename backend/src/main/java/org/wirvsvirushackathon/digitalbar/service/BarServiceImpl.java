package org.wirvsvirushackathon.digitalbar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wirvsvirushackathon.digitalbar.domain.Bar;
import org.wirvsvirushackathon.digitalbar.repository.BarRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BarServiceImpl implements BarService {

    @Autowired
    private BarRepository barRepository;

    @Override
    public List<Bar> findAll() {
        return barRepository.findAll();
    }

    @Override
    public Optional<Bar> findById(Long id) {
        return barRepository.findById(id);
    }

    @Override
    public Bar save(Bar bar) {
        return barRepository.save(bar);
    }

    @Override
    public void deleteById(Long id) {
        barRepository.deleteById(id);
    }
}
