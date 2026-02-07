package com.hrms.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class BookGameSlotRequestDTO {
    @NotEmpty(message = "Minimum 2 user ids required")
    private Set<Long> userIds;

    @NotNull(message = "Game id is required")
    private Long gameId;

    @NotNull(message = "Start time id is required")
    private Long startTime;

    @NotNull(message = "End time id is required")
    private Long endTime;

    @NotNull(message = "Booking Date is required")
    private Date bookingDate;
}
