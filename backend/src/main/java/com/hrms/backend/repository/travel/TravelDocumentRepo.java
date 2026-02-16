package com.hrms.backend.repository.travel;

import com.hrms.backend.entities.travel.TravelDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelDocumentRepo extends JpaRepository<TravelDocument,Long> {
}
