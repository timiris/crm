package com.timiris.crm.repository;

import com.timiris.crm.domain.TestMahi;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestMahi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestMahiRepository extends JpaRepository<TestMahi,Long> {
    
}
