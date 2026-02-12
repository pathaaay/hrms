package com.hrms.backend.service.job;

import com.hrms.backend.dto.job.request.JobReferralEmailRequestDTO;
import com.hrms.backend.entities.jobs.Job;
import com.hrms.backend.entities.jobs.JobReferral;
import com.hrms.backend.entities.jobs.JobReviewStatus;
import com.hrms.backend.entities.jobs.ReferralReviewStatus;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.job.JobReferralRepo;
import com.hrms.backend.service.mail.MailService;
import com.hrms.backend.utilities.Helper;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JobReferralService {
    private final Helper helper;
    private final JobService jobService;
    private final MailService mailService;
    private final JobReferralRepo jobReferralRepo;
    private final JobReviewStatusService jobReviewStatusService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Transactional
    public void referJobToEmails(Long jobId, User user, JobReferralEmailRequestDTO emails) throws BadRequestException, MessagingException {
        Job job = jobService.findById(jobId, true);
        JobReviewStatus status = jobReviewStatusService.findStatusByName(ReferralReviewStatus.NEW);
        List<JobReferral> referrals =
                emails.getEmails().stream().map(email -> {
                    JobReferral referral = new JobReferral();
                    referral.setEmail(email);
                    referral.setSharedBy(user);
                    referral.setStatus(status);
                    referral.setJob(job);
                    referral.setIsDeleted(false);
                    return referral;
                }).toList();

        sendJobMail(emails.getEmails(), user, job);
        jobReferralRepo.saveAll(referrals);
    }

    public void sendJobMail(Set<String> emails, User user, Job job) throws MessagingException, BadRequestException {
        String[] toEmails = new String[emails.size()];
        String applyLink = frontendUrl + "/jobs/" + job.getId() + "/apply?code=" + helper.generateReferCode(user);
        String htmlBody = """
                <div>
                <div>You have got a job referral</div>
                <div style='margin:10px 0px'>Referrer Details:
                    <div>Name:%s</div>
                    <div>Email:%s</div>
                </div>
                <div>Job Title: %s</div>
                <div>Job Summary: %s</div>
                <div>Apply : <a href='%s'>Click here</a></div>
                </div>
                """.formatted(user.getName(), user.getEmail(), job.getTitle(), job.getDescription(), applyLink);

        mailService.sendEmail(emails.toArray(toEmails), "New Job referral by " + user.getName(), htmlBody, job.getJdDocument());
    }
}
