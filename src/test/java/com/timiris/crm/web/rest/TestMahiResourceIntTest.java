package com.timiris.crm.web.rest;

import com.timiris.crm.TimirisCrmApp;

import com.timiris.crm.domain.TestMahi;
import com.timiris.crm.repository.TestMahiRepository;
import com.timiris.crm.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TestMahiResource REST controller.
 *
 * @see TestMahiResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TimirisCrmApp.class)
public class TestMahiResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TestMahiRepository testMahiRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestMahiMockMvc;

    private TestMahi testMahi;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestMahiResource testMahiResource = new TestMahiResource(testMahiRepository);
        this.restTestMahiMockMvc = MockMvcBuilders.standaloneSetup(testMahiResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestMahi createEntity(EntityManager em) {
        TestMahi testMahi = new TestMahi()
            .name(DEFAULT_NAME);
        return testMahi;
    }

    @Before
    public void initTest() {
        testMahi = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestMahi() throws Exception {
        int databaseSizeBeforeCreate = testMahiRepository.findAll().size();

        // Create the TestMahi
        restTestMahiMockMvc.perform(post("/api/test-mahis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMahi)))
            .andExpect(status().isCreated());

        // Validate the TestMahi in the database
        List<TestMahi> testMahiList = testMahiRepository.findAll();
        assertThat(testMahiList).hasSize(databaseSizeBeforeCreate + 1);
        TestMahi testTestMahi = testMahiList.get(testMahiList.size() - 1);
        assertThat(testTestMahi.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTestMahiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testMahiRepository.findAll().size();

        // Create the TestMahi with an existing ID
        testMahi.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestMahiMockMvc.perform(post("/api/test-mahis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMahi)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestMahi> testMahiList = testMahiRepository.findAll();
        assertThat(testMahiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestMahis() throws Exception {
        // Initialize the database
        testMahiRepository.saveAndFlush(testMahi);

        // Get all the testMahiList
        restTestMahiMockMvc.perform(get("/api/test-mahis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testMahi.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTestMahi() throws Exception {
        // Initialize the database
        testMahiRepository.saveAndFlush(testMahi);

        // Get the testMahi
        restTestMahiMockMvc.perform(get("/api/test-mahis/{id}", testMahi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testMahi.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestMahi() throws Exception {
        // Get the testMahi
        restTestMahiMockMvc.perform(get("/api/test-mahis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestMahi() throws Exception {
        // Initialize the database
        testMahiRepository.saveAndFlush(testMahi);
        int databaseSizeBeforeUpdate = testMahiRepository.findAll().size();

        // Update the testMahi
        TestMahi updatedTestMahi = testMahiRepository.findOne(testMahi.getId());
        updatedTestMahi
            .name(UPDATED_NAME);

        restTestMahiMockMvc.perform(put("/api/test-mahis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestMahi)))
            .andExpect(status().isOk());

        // Validate the TestMahi in the database
        List<TestMahi> testMahiList = testMahiRepository.findAll();
        assertThat(testMahiList).hasSize(databaseSizeBeforeUpdate);
        TestMahi testTestMahi = testMahiList.get(testMahiList.size() - 1);
        assertThat(testTestMahi.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTestMahi() throws Exception {
        int databaseSizeBeforeUpdate = testMahiRepository.findAll().size();

        // Create the TestMahi

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestMahiMockMvc.perform(put("/api/test-mahis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testMahi)))
            .andExpect(status().isCreated());

        // Validate the TestMahi in the database
        List<TestMahi> testMahiList = testMahiRepository.findAll();
        assertThat(testMahiList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestMahi() throws Exception {
        // Initialize the database
        testMahiRepository.saveAndFlush(testMahi);
        int databaseSizeBeforeDelete = testMahiRepository.findAll().size();

        // Get the testMahi
        restTestMahiMockMvc.perform(delete("/api/test-mahis/{id}", testMahi.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestMahi> testMahiList = testMahiRepository.findAll();
        assertThat(testMahiList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestMahi.class);
        TestMahi testMahi1 = new TestMahi();
        testMahi1.setId(1L);
        TestMahi testMahi2 = new TestMahi();
        testMahi2.setId(testMahi1.getId());
        assertThat(testMahi1).isEqualTo(testMahi2);
        testMahi2.setId(2L);
        assertThat(testMahi1).isNotEqualTo(testMahi2);
        testMahi1.setId(null);
        assertThat(testMahi1).isNotEqualTo(testMahi2);
    }
}
