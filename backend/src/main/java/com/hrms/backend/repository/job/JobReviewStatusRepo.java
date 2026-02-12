package com.hrms.backend.repository.job;

import com.hrms.backend.entities.jobs.JobReviewStatus;
import com.hrms.backend.entities.jobs.ReferralReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobReviewStatusRepo extends JpaRepository<JobReviewStatus, Long> {
    JobReviewStatus findByName(ReferralReviewStatus name);

}
