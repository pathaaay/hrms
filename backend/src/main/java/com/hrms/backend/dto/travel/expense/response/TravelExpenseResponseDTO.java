package com.hrms.backend.dto.travel.expense.response;

import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.travel.expense.TravelExpenseCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TravelExpenseResponseDTO {
    private Long id;
    private Long amount;
    private String description;
    private String remarks;
    private TravelExpenseCategory expenseCategory;
    private Document expenseProofDocument;
    private Date expenseDate;
    private Date createdAt;
    private Boolean isApproved;
}
