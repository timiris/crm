package com.timiris.crm.service;

import com.timiris.crm.domain.Hero;
import java.util.List;

/**
 * Service Interface for managing Hero.
 */
public interface HeroService {

    /**
     * Save a hero.
     *
     * @param hero the entity to save
     * @return the persisted entity
     */
    Hero save(Hero hero);

    /**
     *  Get all the heroes.
     *
     *  @return the list of entities
     */
    List<Hero> findAll();

    /**
     *  Get the "id" hero.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Hero findOne(Long id);

    /**
     *  Delete the "id" hero.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
