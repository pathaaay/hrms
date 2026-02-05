package com.hrms.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@ToString
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserProfile profile; // "mappedBy" indicates this side is the inverse (not the owner)

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    private UserProfile manager;

}
