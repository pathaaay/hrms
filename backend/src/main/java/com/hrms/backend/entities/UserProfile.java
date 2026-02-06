package com.hrms.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Setter
@Getter
@Entity
@ToString
@Table(name = "user_profiles")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id") // Specifies the foreign key column name
    private User user;

    @ManyToOne
    @JoinColumn(name = "manager_id") // Specifies the foreign key column name
    private User manager;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "date_of_joining")
    private Date dateOfJoining;

    @Column(name = "avatar_file_path", columnDefinition = "TEXT")
    private String avatarFilePath;
}
