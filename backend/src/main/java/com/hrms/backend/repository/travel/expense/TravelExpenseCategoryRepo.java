package com.hrms.backend.repository.travel.expense;

import com.hrms.backend.entities.travel.expense.TravelExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelExpenseCategoryRepo extends JpaRepository<TravelExpenseCategory, Long> {
}
