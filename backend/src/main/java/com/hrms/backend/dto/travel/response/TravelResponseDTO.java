package com.hrms.backend.dto.travel.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TravelResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Long maxAmountPerDay;
    private Date startDate;
    private Date endDate;
    private User createdBy;
    private String city;
    private String state;
    private String country;
    private Set<User> travelMembers;
    private Date createdAt;
}
