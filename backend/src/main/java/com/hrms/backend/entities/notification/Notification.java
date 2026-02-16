package com.hrms.backend.entities.notification;

import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "added_for_id")
    private User addedFor;

    @Column(name = "is_read")
    private Boolean isRead;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "is_deleted")
    private Boolean isDeleted;
}
