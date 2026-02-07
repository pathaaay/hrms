package com.hrms.backend.entities.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;


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

    @Column(nullable = false,name = "is_deleted")
    @ColumnDefault("0")
    private Boolean isDeleted;

    @OneToOne
    @JoinColumn(name = "role_id")
    private Role role;

    //This field will be ignored from every response.
    @JsonIgnore
    private String password;
}
