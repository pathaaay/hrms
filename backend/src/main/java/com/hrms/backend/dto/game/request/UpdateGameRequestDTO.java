package com.hrms.backend.dto.game.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UpdateGameRequestDTO {

    @NotEmpty(message = "at least 1 game id is required")
    private Set<Long> gameIds;
}
