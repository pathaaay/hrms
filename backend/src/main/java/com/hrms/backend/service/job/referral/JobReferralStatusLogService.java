package com.hrms.backend.service.job.referral;

import com.hrms.backend.entities.jobs.referral.JobReferral;
import com.hrms.backend.entities.jobs.referral.JobReferralReviewStatus;
import com.hrms.backend.entities.jobs.referral.JobReferralStatusLog;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.job.referral.JobReferralStatusLogRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobReferralStatusLogService {
    private final JobReferralStatusLogRepo jobReferralStatusLogRepo;

    public void changeStatus(JobReferral jobReferral, User user, JobReferralReviewStatus oldStatus, JobReferralReviewStatus newStatus) {
        JobReferralStatusLog log = new JobReferralStatusLog();
        log.setChangedBy(user);
        log.setOldStatus(oldStatus);
        log.setNewStatus(newStatus);
        log.setJobReferral(jobReferral);
        jobReferralStatusLogRepo.save(log);
    }
}
