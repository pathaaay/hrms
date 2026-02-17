package com.hrms.backend.repository.travel.expense;

import com.hrms.backend.entities.travel.expense.TravelExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelExpenseCategoryRepo extends JpaRepository<TravelExpenseCategory, Long> {
}
