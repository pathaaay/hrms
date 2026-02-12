package com.hrms.backend.dto.user.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hrms.backend.entities.game.Game;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserProfileResponseDTO {
    private Long userId;
    private Long profileId;
    private String name;
    private String email;
    private Long managerId;
    private String role;
    private String department;
    private String city;
    private String state;
    private String country;
    private String timezone;
    private Date dateOfBirth;
    private Date dateOfJoining;
    private String avatarFilePath;
    private Set<Game> interestedGames;
}
