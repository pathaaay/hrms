package com.hrms.backend.dto.response;

import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class UserProfileResponseDTO {
    private Long userId;
    private Long profileId;
    private String name;
    private String email;
    private User manager;
    private String role;
    private String department;
    private String city;
    private String state;
    private String country;
    private String timezone;
    private Date dateOfBirth;
    private Date dateOfJoining;
    private Set<Game> interestedGames;
}
