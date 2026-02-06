package com.hrms.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserProfileResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String avatarFilePath;
    private Date dateOfJoining;
    private Date dateOfBirth;
    private Date manager;
}
