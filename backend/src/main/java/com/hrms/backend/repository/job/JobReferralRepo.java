package com.hrms.backend.repository.job;

import com.hrms.backend.entities.jobs.JobReferral;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobReferralRepo extends JpaRepository<JobReferral, Long> {
}
