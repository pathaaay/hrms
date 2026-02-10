package com.hrms.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameResponseDTO {
    private Long id;
    private String name;
    private int startTime;
    private int endTime;
    private int bookingCycleHours;
    private int maxSlotDurationInMinutes;
    private int maxPlayersPerSlot;
    private Boolean isActive;
}
