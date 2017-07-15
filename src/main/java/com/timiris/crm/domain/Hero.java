package com.timiris.crm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Hero.
 */
@Entity
@Table(name = "hero")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Hero implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "power")
    private String power;

    @Column(name = "alter_ego")
    private String alterEgo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Hero name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPower() {
        return power;
    }

    public Hero power(String power) {
        this.power = power;
        return this;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public String getAlterEgo() {
        return alterEgo;
    }

    public Hero alterEgo(String alterEgo) {
        this.alterEgo = alterEgo;
        return this;
    }

    public void setAlterEgo(String alterEgo) {
        this.alterEgo = alterEgo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Hero hero = (Hero) o;
        if (hero.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hero.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Hero{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", power='" + getPower() + "'" +
            ", alterEgo='" + getAlterEgo() + "'" +
            "}";
    }
}
