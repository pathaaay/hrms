package com.hrms.backend.repository.job.referral;

import com.hrms.backend.entities.jobs.referral.JobReferralStatusLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobReferralStatusLogRepo extends JpaRepository<JobReferralStatusLog, Long> {
}
