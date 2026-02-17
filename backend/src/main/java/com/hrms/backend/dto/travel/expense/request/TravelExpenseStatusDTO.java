package com.hrms.backend.dto.travel.expense.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TravelExpenseStatusDTO {
    @NotNull(message = "Is Approved is required")
    private Boolean isApproved;
    private String remarks;
}
