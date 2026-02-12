package com.hrms.backend.repository.job;

import com.hrms.backend.entities.jobs.Job;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepo extends JpaRepository<Job, Long> {
    @Query("SELECT j as jdFilePath from Job j WHERE j.isDeleted <> true AND j.isActive = true")
    List<Job> findByIsDeletedFalse();

    @Query("SELECT j as jdFilePath from Job j JOIN FETCH j.jobReviewers WHERE j.isDeleted <> true")
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
}
