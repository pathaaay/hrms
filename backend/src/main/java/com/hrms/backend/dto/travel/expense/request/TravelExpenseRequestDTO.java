package com.hrms.backend.dto.travel.expense.request;

import com.hrms.backend.entities.user.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TravelExpenseRequestDTO {

    @NotNull(message = "Amount is required")
    private Long amount;

    @NotNull(message = "Expense Date is required")
    private Date expenseDate;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Expense category is required")
    private Long expenseCategoryId;

    @NotNull(message = "Proof Document is required")
    private Long proofDocumentId;

}
