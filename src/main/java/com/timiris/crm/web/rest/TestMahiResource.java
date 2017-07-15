package com.timiris.crm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.timiris.crm.domain.TestMahi;

import com.timiris.crm.repository.TestMahiRepository;
import com.timiris.crm.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TestMahi.
 */
@RestController
@RequestMapping("/api")
public class TestMahiResource {

    private final Logger log = LoggerFactory.getLogger(TestMahiResource.class);

    private static final String ENTITY_NAME = "testMahi";

    private final TestMahiRepository testMahiRepository;

    public TestMahiResource(TestMahiRepository testMahiRepository) {
        this.testMahiRepository = testMahiRepository;
    }

    /**
     * POST  /test-mahis : Create a new testMahi.
     *
     * @param testMahi the testMahi to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testMahi, or with status 400 (Bad Request) if the testMahi has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-mahis")
    @Timed
    public ResponseEntity<TestMahi> createTestMahi(@RequestBody TestMahi testMahi) throws URISyntaxException {
        log.debug("REST request to save TestMahi : {}", testMahi);
        if (testMahi.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testMahi cannot already have an ID")).body(null);
        }
        TestMahi result = testMahiRepository.save(testMahi);
        return ResponseEntity.created(new URI("/api/test-mahis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-mahis : Updates an existing testMahi.
     *
     * @param testMahi the testMahi to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testMahi,
     * or with status 400 (Bad Request) if the testMahi is not valid,
     * or with status 500 (Internal Server Error) if the testMahi couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-mahis")
    @Timed
    public ResponseEntity<TestMahi> updateTestMahi(@RequestBody TestMahi testMahi) throws URISyntaxException {
        log.debug("REST request to update TestMahi : {}", testMahi);
        if (testMahi.getId() == null) {
            return createTestMahi(testMahi);
        }
        TestMahi result = testMahiRepository.save(testMahi);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testMahi.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-mahis : get all the testMahis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testMahis in body
     */
    @GetMapping("/test-mahis")
    @Timed
    public List<TestMahi> getAllTestMahis() {
        log.debug("REST request to get all TestMahis");
        return testMahiRepository.findAll();
    }

    /**
     * GET  /test-mahis/:id : get the "id" testMahi.
     *
     * @param id the id of the testMahi to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testMahi, or with status 404 (Not Found)
     */
    @GetMapping("/test-mahis/{id}")
    @Timed
    public ResponseEntity<TestMahi> getTestMahi(@PathVariable Long id) {
        log.debug("REST request to get TestMahi : {}", id);
        TestMahi testMahi = testMahiRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testMahi));
    }

    /**
     * DELETE  /test-mahis/:id : delete the "id" testMahi.
     *
     * @param id the id of the testMahi to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-mahis/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestMahi(@PathVariable Long id) {
        log.debug("REST request to delete TestMahi : {}", id);
        testMahiRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
