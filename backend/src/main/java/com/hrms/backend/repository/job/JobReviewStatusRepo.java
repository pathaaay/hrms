package com.hrms.backend.repository.job;

import com.hrms.backend.entities.jobs.referral.JobReferralReviewStatus;
import com.hrms.backend.entities.jobs.referral.ReferralReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobReviewStatusRepo extends JpaRepository<JobReferralReviewStatus, Long> {
    JobReferralReviewStatus findByName(ReferralReviewStatus name);
}
