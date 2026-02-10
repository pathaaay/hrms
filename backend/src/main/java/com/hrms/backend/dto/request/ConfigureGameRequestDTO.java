package com.hrms.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfigureGameRequestDTO {
    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Start Time is required")
    private Integer startTime;

    @NotNull(message = "End time is required")
    private Integer endTime;

    @NotNull(message = "Booking Cycle In Hours is required")
    private Integer bookingCycleHours;

    @NotNull(message = "Max slot duration in minutes is required")
    private Integer maxSlotDurationInMinutes;

    @NotNull(message = "Max player per slot is required")
    private Integer maxPlayersPerSlot;

    @NotNull(message = "Is active is required")
    private Boolean isActive;
}

