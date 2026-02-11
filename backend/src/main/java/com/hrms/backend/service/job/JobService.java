package com.hrms.backend.service.job;

import com.hrms.backend.dto.request.JobRequestDTO;
import com.hrms.backend.dto.response.JobResponseDTO;
import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.jobs.Job;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.job.JobRepo;
import com.hrms.backend.repository.user.UserRepo;
import com.hrms.backend.service.document.DocumentService;
import com.hrms.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepo jobRepo;
    private final UserRepo userRepo;
    private final UserService userService;
    private final DocumentService documentService;

    public JobResponseDTO convertToDTO(Job job) {
        JobResponseDTO response = new JobResponseDTO();
        response.setId(job.getId());
        response.setDescription(job.getDescription());

        if (userService.hasRole("ROLE_HR")) response.setJobReviewers(job.getJobReviewers());

        response.setTitle(job.getTitle());
        response.setCreatedBy(job.getCreatedBy());
        response.setCreatedAt(job.getCreatedAt());
        response.setDescription(job.getDescription());
        response.setDefaultHrEmail(job.getDefaultHrEmail());
        response.setJdFilePath(job.getJdDocument().getFilePath());
        return response;
    }

    public List<JobResponseDTO> convertToDTOList(List<Job> jobs) {
        return jobs.stream().map(this::convertToDTO).toList();
    }

    public List<JobResponseDTO> getAllJobs() {
        List<Job> jobs;
        if (userService.hasRole("ROLE_HR")) {
            jobs = jobRepo.findAllWithReviewers();
        } else {
            jobs = jobRepo.findByIsDeletedFalse();
        }
        return convertToDTOList(jobs);
    }

    public void createJob(User user, JobRequestDTO dto) throws BadRequestException {
        if (dto.getJdFileId() == null) throw new BadRequestException("JD Document is required");

        Job job = new Job();
        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setDefaultHrEmail(dto.getDefaultHrEmail());
        job.setCreatedBy(user);
        Document document = documentService.getDocument(dto.getJdFileId());
        job.setJdDocument(document);
        Set<User> reviewers = new HashSet<>(userRepo.findAllById(dto.getReviewerIds()));
        job.setJobReviewers(reviewers);
        job.setIsDeleted(false);
        jobRepo.save(job);
    }

    public void updateJob(User user, Long jobId, JobRequestDTO dto) throws BadRequestException {
        Job job = jobRepo.findById(jobId).orElseThrow(() -> new BadRequestException("Job not found"));

        log.info("job:{}, user:{}", job.getCreatedBy().getId(), user.getId());

        if (Boolean.TRUE.equals(job.getIsDeleted()))
            throw new BadRequestException("Job not found");

        if (!user.getId().equals(job.getCreatedBy().getId()))
            throw new BadRequestException("You can only update jobs created by you.");


        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setDefaultHrEmail(dto.getDefaultHrEmail());
        job.setCreatedBy(user);

        if (dto.getJdFileId() != null) {
            Document document = documentService.getDocument(dto.getJdFileId());
            job.setJdDocument(document);
        }
        Set<User> reviewers = new HashSet<>(userRepo.findAllById(dto.getReviewerIds()));
        job.setJobReviewers(reviewers);
        job.setIsDeleted(false);
        jobRepo.save(job);
    }

    public void deleteJob(Long jobId, User user) throws BadRequestException {
        Job job = jobRepo.findById(jobId).orElseThrow(() -> new BadRequestException("Job not found"));
        if (Boolean.TRUE.equals(job.getIsDeleted()))
            throw new BadRequestException("Job not found");

        if (!Objects.equals(user.getId(), job.getCreatedBy().getId()))
            throw new BadRequestException("You can only delete jobs created by you.");

        job.setIsDeleted(true);
        jobRepo.save(job);
    }
}
