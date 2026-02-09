package com.hrms.backend.dto.response;

import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BookedGameSlotsResponseDTO {
    private Long gameId;
    private User players;
    private String gameName;
    private String status;
    private Date date;
    private int startTime;
    private int endTime;
}
