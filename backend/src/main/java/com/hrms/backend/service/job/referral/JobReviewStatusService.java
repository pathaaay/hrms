package com.hrms.backend.service.job.referral;

import com.hrms.backend.entities.jobs.referral.JobReferralReviewStatus;
import com.hrms.backend.entities.jobs.referral.ReferralReviewStatus;
import com.hrms.backend.repository.job.JobReviewStatusRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobReviewStatusService {
    public final JobReviewStatusRepo jobReviewStatusRepo;

    public JobReferralReviewStatus findStatusByName(ReferralReviewStatus referralReviewStatus){
        return jobReviewStatusRepo.findByName(referralReviewStatus);
    }

}
