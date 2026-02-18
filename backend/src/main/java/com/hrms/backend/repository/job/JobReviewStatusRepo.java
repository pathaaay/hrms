package com.hrms.backend.repository.job;

import com.hrms.backend.entities.job.referral.JobReferralReviewStatus;
import com.hrms.backend.entities.job.referral.ReferralReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobReviewStatusRepo extends JpaRepository<JobReferralReviewStatus, Long> {
    JobReferralReviewStatus findByName(ReferralReviewStatus name);
}
