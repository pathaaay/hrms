package com.hrms.backend.service.job;

import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.job.JobReferralRepo;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobReferralService {
    private final JobService jobService;
    private final JobReferralRepo jobReferralRepo;

    public void referJobToEmails(Long jobId, User user) throws BadRequestException {

    }
}
