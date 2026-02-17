package com.hrms.backend.repository.travel.expense;

import com.hrms.backend.entities.travel.expense.TravelExpenseStatusLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelExpenseStatusLogRepo extends JpaRepository<TravelExpenseStatusLog, Long> {
}
