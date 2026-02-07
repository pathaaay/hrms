package com.hrms.backend.entities.user;

import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.localization.City;
import com.hrms.backend.entities.localization.TimeZone;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.Set;

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
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "timezone_id")
    private TimeZone timezone;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToMany
    @JoinTable(
            name = "user_interested_games",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "game_id"))
    Set<Game> interestedGames;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "date_of_joining")
    private Date dateOfJoining;

    @Column(name = "avatar_file_path", columnDefinition = "TEXT")
    private String avatarFilePath;
}
