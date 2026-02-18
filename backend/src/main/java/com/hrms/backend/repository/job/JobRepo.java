package com.hrms.backend.repository.job;

import com.hrms.backend.entities.job.Job;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Job, Long> {
    @Query("SELECT j from Job j WHERE j.isDeleted <> true AND j.isActive = true")
    List<Job> findByIsDeletedFalse();

    @Query("SELECT j from Job j JOIN FETCH j.jobReviewers WHERE j.isDeleted <> true")
    List<Job> findAllWithReviewers();

    @Modifying
    @Transactional
    @Query("UPDATE Job j SET j.isDeleted=true where j.createdBy.id=:userId and j.id=:id")
    int deleteJob(@Param("userId") Long userId, @Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Job j " +
            "SET j.isActive = CASE WHEN j.isActive= true then false ELSE true " +
            "END where j.createdBy.id=:userId and j.id=:id")
    int toggleJob(@Param("userId") Long userId, @Param("id") Long id);

    @Query(value = "SELECT u.email from job_reviewers jr JOIN users u ON u.id = jr.user_id WHERE jr.job_id=:id", nativeQuery = true)
    List<String> getReviewerEmails(@Param("id") Long id);
}
