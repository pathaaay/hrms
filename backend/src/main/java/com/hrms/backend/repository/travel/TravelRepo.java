package com.hrms.backend.repository.travel;

import com.hrms.backend.entities.travel.Travel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TravelRepo extends JpaRepository<Travel, Long> {
    Optional<Travel> findByIdAndCreatedBy_IdAndIsDeleted(Long id, Long userId, Boolean isDeleted);

    Optional<Travel> findByIdAndIsDeleted(Long id, Boolean isDeleted);

    List<Travel> findAllByIsDeleted(Boolean isDeleted);

    List<Travel> findAllByIsDeletedAndTravelMembers_Id(Boolean isDeleted, Long memberId);

    @Modifying
    @Transactional
    @Query("UPDATE Travel t set t.isDeleted=true where t.id=:travelId AND t.createdBy.id=:userId")
    void findByIdAndDelete(@Param("travelId") Long travelId, @Param("userId") Long userId);
}
