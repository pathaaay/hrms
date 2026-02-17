package com.hrms.backend.service.travel.expense;

import com.hrms.backend.entities.travel.expense.TravelExpense;
import com.hrms.backend.entities.travel.expense.TravelExpenseStatusLog;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.travel.expense.TravelExpenseStatusLogRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TravelExpenseStatusLogService {
    private final TravelExpenseStatusLogRepo travelExpenseStatusLogRepo;

    public void createLog(TravelExpense expense, User user) {
        TravelExpenseStatusLog log = new TravelExpenseStatusLog();
        log.setRemarks(expense.getRemarks());
        log.setIsApproved(expense.getIsApproved());
        log.setChangedBy(user);
        travelExpenseStatusLogRepo.save(log);
    }
}
