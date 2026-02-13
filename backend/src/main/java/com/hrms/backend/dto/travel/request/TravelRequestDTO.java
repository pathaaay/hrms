package com.hrms.backend.dto.travel.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class TravelRequestDTO {
    @NotEmpty(message = "At least 1 user is required for travel")
    private Set<Long> userIds;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Max amount per day is required")
    private Long maxAmountPerDay;

    @NotBlank(message = "Start date is required")
    private String startDate;

    @NotBlank(message = "End date is required")
    private String endDate;

    @NotNull(message = "City id is required")
    private Long cityId;
}
