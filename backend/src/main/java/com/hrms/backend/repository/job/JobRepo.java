package com.hrms.backend.repository.job;

import com.hrms.backend.entities.jobs.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepo extends JpaRepository<Job, Long> {
    @Query("SELECT j, jd from Job j JOIN FETCH j.jdDocument as jd WHERE j.isDeleted <> true")
    List<Job> findByIsDeletedFalse();
}
