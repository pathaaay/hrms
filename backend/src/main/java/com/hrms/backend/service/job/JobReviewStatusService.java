package com.hrms.backend.service.job;

import com.hrms.backend.entities.jobs.JobReviewStatus;
import com.hrms.backend.entities.jobs.ReferralReviewStatus;
import com.hrms.backend.repository.job.JobReviewStatusRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobReviewStatusService {
    public final JobReviewStatusRepo jobReviewStatusRepo;

    public JobReviewStatus findStatusByName(ReferralReviewStatus referralReviewStatus){
        return jobReviewStatusRepo.findByName(referralReviewStatus);
    }
}
