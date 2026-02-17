package com.hrms.backend.controller.travel.expense;

import com.hrms.backend.entities.travel.expense.TravelExpenseCategory;
import com.hrms.backend.service.travel.expense.TravelExpenseCategoryService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/travels/expenses/categories")
@RequiredArgsConstructor
public class TravelExpenseCategoryController {
    private final TravelExpenseCategoryService travelExpenseCategoryService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<TravelExpenseCategory>>> getAllExpenseCategories() {
        return ResponseEntity.ok(new ApiResponse(true, "Categories get successfully", travelExpenseCategoryService.getAllCategories()));
    }
}
