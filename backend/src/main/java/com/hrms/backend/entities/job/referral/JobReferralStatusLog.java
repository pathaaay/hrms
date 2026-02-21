package com.hrms.backend.entities.job.referral;

import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "job_referral_status_logs")
public class JobReferralStatusLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_referral_id")
    private JobReferral jobReferral;

    @ManyToOne
    @JoinColumn(name = "old_status_id")
    private JobReferralReviewStatus oldStatus;

    @ManyToOne
    @JoinColumn(name = "new_status_id")
    private JobReferralReviewStatus newStatus;

    @ManyToOne
    @JoinColumn(name = "changed_by_user_id")
    private User changedBy;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;
}
