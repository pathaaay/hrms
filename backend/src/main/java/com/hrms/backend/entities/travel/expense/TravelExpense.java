package com.hrms.backend.entities.travel.expense;

import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.travel.Travel;
import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "travel_expenses")
public class TravelExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long amount;
    private String description;
    private String remarks;

    @ManyToOne
    @JoinColumn(name = "travel_id")
    private Travel travel;

    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "expense_category_id")
    private User expenseCategory;

    @ManyToMany
    @JoinTable(
            name = "expense_proof_documents",
            joinColumns = @JoinColumn(name = "expense_id"),
            inverseJoinColumns = @JoinColumn(name = "document_id")
    )
    private Set<Document> expenseProofDocuments;

    @Column(name = "expense_date")
    private Date expenseDate;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "is_deleted")
    private Boolean isDeleted;
}
