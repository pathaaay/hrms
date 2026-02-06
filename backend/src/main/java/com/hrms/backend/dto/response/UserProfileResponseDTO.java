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
    private User manager_details;
    private String role;
    private String department;
    private Date dateOfBirth;
    private Date dateOfJoining;
}
