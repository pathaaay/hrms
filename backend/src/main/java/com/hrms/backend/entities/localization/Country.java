package com.hrms.backend.entities.localization;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@Entity
@ToString
@Table(name = "countries")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;

    @Column(nullable = false,name = "is_deleted")
    @ColumnDefault("0")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    //This field will be ignored from every response.
    @JsonIgnore
    private String password;
}
