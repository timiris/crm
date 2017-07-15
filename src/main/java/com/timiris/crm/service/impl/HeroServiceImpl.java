package com.timiris.crm.service.impl;

import com.timiris.crm.service.HeroService;
import com.timiris.crm.domain.Hero;
import com.timiris.crm.repository.HeroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Hero.
 */
@Service
@Transactional
public class HeroServiceImpl implements HeroService{

    private final Logger log = LoggerFactory.getLogger(HeroServiceImpl.class);

    private final HeroRepository heroRepository;

    public HeroServiceImpl(HeroRepository heroRepository) {
        this.heroRepository = heroRepository;
    }

    /**
     * Save a hero.
     *
     * @param hero the entity to save
     * @return the persisted entity
     */
    @Override
    public Hero save(Hero hero) {
        log.debug("Request to save Hero : {}", hero);
        return heroRepository.save(hero);
    }

    /**
     *  Get all the heroes.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Hero> findAll() {
        log.debug("Request to get all Heroes");
        return heroRepository.findAll();
    }

    /**
     *  Get one hero by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Hero findOne(Long id) {
        log.debug("Request to get Hero : {}", id);
        return heroRepository.findOne(id);
    }

    /**
     *  Delete the  hero by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Hero : {}", id);
        heroRepository.delete(id);
    }
}
