package com.hrms.backend.repository.job;

import com.hrms.backend.entities.jobs.referral.JobReferral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobReferralRepo extends JpaRepository<JobReferral, Long> {
    @Query("SELECT jr from JobReferral jr WHERE jr.sharedBy.id=:id AND jr.isDeleted=false")
    List<JobReferral> findMyReferrals(@Param("id") Long id);

    @Query(value = "SELECT jr from JobReferral jr JOIN jr.job.jdDocument JOIN jr.job.jobReviewers jrv WHERE jr.job.isActive=true AND jr.isDeleted=false AND jrv.id=:id")
    List<JobReferral> findAssignedJobReferrals(@Param("id") Long id);
}
