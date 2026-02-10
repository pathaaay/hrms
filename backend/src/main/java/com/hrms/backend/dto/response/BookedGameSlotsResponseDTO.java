package com.hrms.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hrms.backend.entities.game.GameTeam;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookedGameSlotsResponseDTO {
    private Long id;
    private int startTime;
    private int endTime;
    private Boolean isConfirmed;
    private Date createdAt;
    private Date bookedSlotDate;
    private GameTeam team;
}
