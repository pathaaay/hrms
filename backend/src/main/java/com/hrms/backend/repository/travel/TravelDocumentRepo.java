package com.hrms.backend.repository.travel;

import com.hrms.backend.entities.travel.TravelDocument;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelDocumentRepo extends JpaRepository<TravelDocument, Long> {
    List<TravelDocument> findByIdAndIsDeleted(Long id, Boolean isDeleted);

    @Modifying
    @Transactional
    @Query("UPDATE TravelDocument td SET td.isDeleted=true WHERE td.id=:travelDocumentId")
    int findAndDeleteById(@Param("travelDocumentId") Long travelDocumentId);
}
