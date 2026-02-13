package com.hrms.backend.repository.document;

import com.hrms.backend.entities.document.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepo extends JpaRepository<Document, Long> {
}
