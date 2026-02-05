package com.hrms.backend.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@ToString
@Table(name = "roles")
public class Role {
    private int id;
    private String name;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private UserProfile userProfile;
}
