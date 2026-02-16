package com.hrms.backend.repository.travel;

import com.hrms.backend.entities.travel.TravelDocument;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TravelDocumentRepo extends JpaRepository<TravelDocument, Long> {
    List<TravelDocument> findByTravel_IdAndIsDeleted(Long id, Boolean isDeleted);

    @Query("SELECT td from TravelDocument td WHERE td.travel.id=:travelId AND td.isDeleted=false AND (td.addedFor.id=:userId OR td.addedFor IS NULL OR td.document.uploadedBy.id=:userId)")
    List<TravelDocument> findAllByTravelIdAndIsDeleted(@Param("travelId") Long travelId, @Param("userId") Long userId);

    Optional<TravelDocument> findByIdAndIsDeleted(Long id, Boolean isDeleted);


    @Modifying
    @Transactional
    @Query("UPDATE TravelDocument td SET td.isDeleted=true WHERE td.id=:travelDocumentId AND td.document.uploadedBy.id=:userId")
    void findAndDeleteById(@Param("travelDocumentId") Long travelDocumentId, @Param("userId") Long userId);
}
