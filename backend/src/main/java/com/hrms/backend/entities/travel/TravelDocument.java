package com.hrms.backend.entities.travel;

import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "travel_documents")
public class TravelDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "added_for_id")
    private User addedFor;

    @ManyToOne
    @JoinColumn(name = "travel_id")
    private Travel travel;

    @OneToOne()
    @JoinColumn(name = "document_id")
    private Document document;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;
}
