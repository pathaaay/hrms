package com.hrms.backend.service.job.referral;

import com.hrms.backend.dto.job.response.JobReferralStatusLogResponseDTO;
import com.hrms.backend.entities.jobs.referral.JobReferral;
import com.hrms.backend.entities.jobs.referral.JobReferralReviewStatus;
import com.hrms.backend.entities.jobs.referral.JobReferralStatusLog;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.job.referral.JobReferralStatusLogRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobReferralStatusLogService {
    private final JobReferralStatusLogRepo jobReferralStatusLogRepo;
    private final ModelMapper modelMapper;

    public JobReferralStatusLogResponseDTO convertToDTO(JobReferralStatusLog referral) {
        JobReferralStatusLogResponseDTO dto = modelMapper.map(referral, JobReferralStatusLogResponseDTO.class);
        dto.setOldStatus(referral.getOldStatus().getName());
        dto.setNewStatus(referral.getNewStatus().getName());
        return dto;
    }

    public List<JobReferralStatusLogResponseDTO> convertToDTOList(List<JobReferralStatusLog> referrals) {
        return referrals.stream().map(this::convertToDTO).toList();
    }

    public List<JobReferralStatusLogResponseDTO> getStatusLogsByReferralId(Long referralId) {
        return convertToDTOList(jobReferralStatusLogRepo.findByReferralId(referralId));
    }

    public void changeStatus(JobReferral jobReferral, User user, JobReferralReviewStatus oldStatus, JobReferralReviewStatus newStatus) {
        JobReferralStatusLog log = new JobReferralStatusLog();
        log.setChangedBy(user);
        log.setOldStatus(oldStatus);
        log.setNewStatus(newStatus);
        log.setJobReferral(jobReferral);
        jobReferralStatusLogRepo.save(log);
    }
}
