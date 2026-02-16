package com.hrms.backend.service.job;

import com.hrms.backend.dto.job.request.JobRequestDTO;
import com.hrms.backend.dto.job.response.JobResponseDTO;
import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.jobs.Job;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.job.JobRepo;
import com.hrms.backend.service.document.DocumentService;
import com.hrms.backend.service.user.UserService;
import com.hrms.backend.utilities.roles.Roles;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepo jobRepo;
    private final UserService userService;
    private final DocumentService documentService;
    private final ModelMapper modelMapper;

    public JobResponseDTO convertToDTO(Job job) {
        JobResponseDTO response = modelMapper.map(job, JobResponseDTO.class);
        response.setJdFilePath(job.getJdDocument().getFilePath());
        if (userService.hasRole(Roles.ROLE_HR)) response.setJobReviewers(job.getJobReviewers());
        return response;
    }

    public List<JobResponseDTO> convertToDTOList(List<Job> jobs) {
        return jobs.stream().map(this::convertToDTO).toList();
    }

    public Job convertToEntity(JobRequestDTO dto) {
        return modelMapper.map(dto, Job.class);
    }

    public List<JobResponseDTO> getAllJobs() {
        List<Job> jobs;
        if (userService.hasRole(Roles.ROLE_HR)) {
            jobs = jobRepo.findAllWithReviewers();
        } else {
            jobs = jobRepo.findByIsDeletedFalse();
        }
        return convertToDTOList(jobs);
    }

    public Job findById(Long jobId) throws BadRequestException {
        Job job = jobRepo.findById(jobId).orElseThrow(() -> new BadRequestException("Job not found"));

        if (Boolean.TRUE.equals(job.getIsDeleted()))
            throw new BadRequestException("Job not found");
        return job;
    }

    public Job findById(Long jobId, Boolean isActive) throws BadRequestException {
        Job job = findById(jobId);

        if (Boolean.TRUE.equals(isActive) && Boolean.FALSE.equals(job.getIsActive())) {
            throw new BadRequestException("Job not found");
        }
        return job;
    }

    @Transactional
    public void createJob(User user, JobRequestDTO dto) throws BadRequestException {
        if (dto.getJdFileId() == null) throw new BadRequestException("JD Document is required");

        Job job = convertToEntity(dto);
        job.setCreatedBy(user);

        Document document = documentService.findById(dto.getJdFileId());
        job.setJdDocument(document);

        Set<User> reviewers = userService.findAllById(dto.getReviewerIds());
        job.setJobReviewers(reviewers);

        job.setIsDeleted(false);
        jobRepo.save(job);
    }

    @Transactional
    public void updateJob(User user, Long jobId, JobRequestDTO dto) throws BadRequestException {
        Job old = findById(jobId);
        if (!user.getId().equals(old.getCreatedBy().getId()))
            throw new BadRequestException("You cannot update this job.");
        Job job = convertToEntity(dto);
        job.setCreatedBy(user);
        job.setId(old.getId());
        Set<User> reviewers = userService.findAllById(dto.getReviewerIds());
        job.setJobReviewers(reviewers);
        if (dto.getJdFileId() != null) {
            Document document = documentService.findById(dto.getJdFileId());
            job.setJdDocument(document);
        }
        jobRepo.save(job);
    }

    public void toggleJobActivation(Long jobId, User user) throws BadRequestException {
        int toggled = jobRepo.toggleJob(user.getId(), jobId);
        if (toggled == 0) throw new BadRequestException("Failed to toggle job");
    }

    public void deleteJob(Long jobId, User user) throws BadRequestException {
        int deleted = jobRepo.deleteJob(user.getId(), jobId);
        if (deleted == 0) throw new BadRequestException("Failed to delete job");
    }

    public String[] getReviewerEmails(Long jobId) {
        return jobRepo.getReviewerEmails(jobId).toArray(new String[0]);
    }
}
