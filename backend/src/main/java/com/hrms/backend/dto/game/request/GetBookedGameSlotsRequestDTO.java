package com.hrms.backend.dto.game.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class GetBookedGameSlotsRequestDTO {
    @NotNull(message = "Game id is required")
    private Long gameId;

    @NotNull(message = "From Date is required")
    private Date fromDate;

    @NotNull(message = "From Date is required")
    private Date toDate;
}

