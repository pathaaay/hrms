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

    Optional<TravelDocument> findByIdAndIsDeleted(Long id, Boolean isDeleted);

    List<TravelDocument> findByTravel_IdAndIsDeletedAndAddedFor_IdOrDocument_UploadedBy_IdOrAddedForIsNull(Long travelId, Boolean isDeleted, Long addedById, Long addedForId);

    @Modifying
    @Transactional
    @Query("UPDATE TravelDocument td SET td.isDeleted=true WHERE td.id=:travelDocumentId AND td.document.uploadedBy.id=:userId")
    void findAndDeleteById(@Param("travelDocumentId") Long travelDocumentId, @Param("userId") Long userId);
}
