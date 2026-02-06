package com.hrms.backend.dto.response;

import com.hrms.backend.entities.Role;
import com.hrms.backend.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserProfileResponseDTO {
    private Long id;
    private User user;
    private User manager;
    private Role role;
    private Date dateOfBirth;
    private Date dateOfJoining;
}
