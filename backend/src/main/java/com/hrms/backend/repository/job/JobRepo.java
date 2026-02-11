package com.hrms.backend.repository.job;

import com.hrms.backend.entities.jobs.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepo extends JpaRepository<Job, Long> {
    @Query("SELECT j as jdFilePath from Job j WHERE j.isDeleted <> true AND j.isActive = true")
    List<Job> findByIsDeletedFalse();

    @Query("SELECT j as jdFilePath from Job j JOIN FETCH j.jobReviewers WHERE j.isDeleted <> true")
    List<Job> findAllWithReviewers();
}
