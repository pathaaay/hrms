package com.hrms.backend.dto.response;

import com.hrms.backend.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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
}
