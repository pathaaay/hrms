package com.hrms.backend.service.travel.expense;

import com.hrms.backend.entities.travel.expense.TravelExpenseCategory;
import com.hrms.backend.repository.travel.expense.TravelExpenseCategoryRepo;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelExpenseCategoryService {
    private final TravelExpenseCategoryRepo travelExpenseCategoryRepo;

    public TravelExpenseCategory findById(Long id) throws BadRequestException {
        return travelExpenseCategoryRepo.findById(id).orElseThrow(() -> new BadRequestException("Category not found"));
    }

    public List<TravelExpenseCategory> getAllCategories() {
        return travelExpenseCategoryRepo.findAll();
    }
}
