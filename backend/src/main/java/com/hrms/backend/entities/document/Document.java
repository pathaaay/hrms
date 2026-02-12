package com.hrms.backend.entities.document;

import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@ToString
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "file_original_name", columnDefinition = "nvarchar(500)")
    private String fileOriginalName;

    @Column(name = "file_path", columnDefinition = "nvarchar(500)")
    private String filePath;

    @ManyToOne
    @JoinColumn(name = "uploaded_by_id")
    private User uploadedBy;
}
