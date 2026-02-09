package com.hrms.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ConfigureGameRequestDTO {
    @NotNull(message = "From Date is required")
    private Date fromDate;

    @NotNull(message = "From Date is required")
    private Date toDate;
}

