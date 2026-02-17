package com.hrms.backend.repository.travel.expense;

import com.hrms.backend.entities.travel.expense.TravelExpense;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TravelExpenseRepo extends JpaRepository<TravelExpense, Long> {

    List<TravelExpense> findAllByTravel_IdAndIsDeletedAndCreatedBy_Id(Long travelId, Boolean isDeleted, Long userId);
    List<TravelExpense> findAllByTravel_IdAndIsDeleted(Long travelId, Boolean isDeleted);

    Optional<TravelExpense> findByIdAndIsDeleted(Long id, Boolean isDeleted);

    @Modifying
    @Transactional
    @Query("UPDATE TravelExpense te SET te.isDeleted=true WHERE te.id=:id")
    void findAndDeleteById(@Param("id") Long id);
}
