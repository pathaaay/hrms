package com.hrms.backend.repository.job.referral;

import com.hrms.backend.entities.jobs.referral.JobReferralStatusLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobReferralStatusLogRepo extends JpaRepository<JobReferralStatusLog, Long> {

    @Query(value = "SELECT jrsl.* from job_referral_status_logs jrsl WHERE jrsl.job_referral_id=:referralId", nativeQuery = true)
    List<JobReferralStatusLog> findByReferralId(@Param("referralId") Long referralId);
}
