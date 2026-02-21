package com.hrms.backend.service.job.referral;

import com.hrms.backend.dto.job.request.JobReferralEmailRequestDTO;
import com.hrms.backend.dto.job.request.JobReferralRequestDTO;
import com.hrms.backend.dto.job.response.JobReferralResponseDTO;
import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.job.Job;
import com.hrms.backend.entities.job.referral.JobReferral;
import com.hrms.backend.entities.job.referral.JobReferralReviewStatus;
import com.hrms.backend.entities.job.referral.ReferralReviewStatus;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.job.JobReferralRepo;
import com.hrms.backend.service.document.DocumentService;
import com.hrms.backend.service.job.JobService;
import com.hrms.backend.service.mail.MailService;
import jakarta.mail.MessagingException;
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
public class JobReferralService {
    private final JobService jobService;
    private final MailService mailService;
    private final ModelMapper modelMapper;
    private final JobReferralRepo jobReferralRepo;
    private final DocumentService documentService;
    private final JobReviewStatusService jobReviewStatusService;
    private final JobReferralStatusLogService jobReferralStatusLogService;


    private JobReferral convertToEntity(User user, String email, Job job) {
        JobReferralReviewStatus status = jobReviewStatusService.findStatusByName(ReferralReviewStatus.NEW);
        JobReferral referral = new JobReferral();
        referral.setEmail(email);
        referral.setSharedBy(user);
        referral.setStatus(status);
        referral.setJob(job);
        referral.setIsDeleted(false);
        return referral;
    }

    public JobReferralResponseDTO convertToDTO(JobReferral referral) {
        JobReferralResponseDTO dto = modelMapper.map(referral, JobReferralResponseDTO.class);
        if (referral.getCvFile() != null) dto.setCvFilePath(referral.getCvFile().getFilePath());

        dto.setStatus(referral.getStatus().getName());
        dto.setJobTitle(referral.getJob().getTitle());
        if (referral.getJob().getJdDocument() != null)
            dto.setJdFilePath(referral.getJob().getJdDocument().getFilePath());
        return dto;
    }

    public List<JobReferralResponseDTO> convertToDTOList(List<JobReferral> referrals) {
        return referrals.stream().map(this::convertToDTO).toList();
    }

    public List<JobReferralResponseDTO> getMyReferrals(User user) {
        return convertToDTOList(jobReferralRepo.findMyReferrals(user.getId()));
    }

    public List<JobReferralResponseDTO> getAssignedReferrals(User user) {
        return convertToDTOList(jobReferralRepo.findAssignedJobReferrals(user.getId()));
    }

    @Transactional
    public void changeStatus(Long referralId, User user, ReferralReviewStatus value) throws BadRequestException {
        JobReferral referral = jobReferralRepo.findById(referralId).orElseThrow(() -> new BadRequestException("Referral not found"));
        JobReferralReviewStatus oldStatus = referral.getStatus();
        JobReferralReviewStatus newStatus = jobReviewStatusService.findStatusByName(value);
        referral.setStatus(newStatus);
        jobReferralRepo.save(referral);
        jobReferralStatusLogService.changeStatus(referral, user, oldStatus, newStatus);
    }

    @Transactional
    public void referJobToEmails(Long jobId, User user, JobReferralEmailRequestDTO emails) throws BadRequestException, MessagingException {
        Job job = jobService.findById(jobId, true);
        List<JobReferral> referrals =
                emails.getEmails().stream().map(email -> convertToEntity(user, email, job)).toList();

        sendMailToReferrer(emails.getEmails(), user, job);
        jobReferralRepo.saveAll(referrals);
    }

    @Transactional
    public void createReferral(Long jobId, User user, JobReferralRequestDTO dto) throws BadRequestException, MessagingException {
        Job job = jobService.findById(jobId, true);
        Document document = documentService.findById(dto.getCvFileId());
        JobReferral referral = convertToEntity(user, dto.getEmail(), job);
        referral.setCvFile(document);
        referral.setShortNote(dto.getShortNote());
        jobReferralRepo.save(referral);
        sendMailToHR(user, referral, job);
    }

    public void sendMailToHR(User user, JobReferral referral, Job job) throws MessagingException, BadRequestException {
        String[] reviewerEmails = jobService.getReviewerEmails(job.getId());

        int i = 0;
        String[] toEmails = new String[reviewerEmails.length + 2];
        toEmails[i++] = job.getCreatedBy().getEmail();
        if (!job.getDefaultHrEmail().isEmpty()) toEmails[i++] = job.getDefaultHrEmail();
        for (String email : reviewerEmails) {
            toEmails[i++] = email;
        }

        String htmlBody = """
                <div>
                <div>Job Title: %s</div>
                <div>Job ID: %d</div>
                <br/>
                <div style='margin:10px 0px'>Referrer Details:
                    <div>Name:%s</div>
                    <div>Email:%s</div>
                </div>
                <br/>
                <div style='margin:10px 0px'>Friend's Details:
                    <div>Name:%s</div>
                    <div>Email:%s</div>
                    <div>Short note:%s</div>
                </div>
                </div>
                """.formatted(job.getTitle(), job.getId(), user.getName(), user.getEmail(), referral.getName(), referral.getEmail(), referral.getShortNote());

        mailService.sendEmail(toEmails, "New referral", htmlBody, referral.getCvFile());
    }

    public void sendMailToReferrer(Set<String> emails, User user, Job job) throws MessagingException, BadRequestException {
        String[] toEmails = new String[emails.size()];
        String htmlBody = """
                <div>
                <div>You have got a job referral</div>
                <div style='margin:10px 0px'>Referrer Details:
                    <div>Name:%s</div>
                    <div>Email:%s</div>
                </div>
                <div>Job Title: %s</div>
                <div>Job Summary: %s</div>
                </div>
                """.formatted(user.getName(), user.getEmail(), job.getTitle(), job.getDescription());

        mailService.sendEmail(emails.toArray(toEmails), "New Job referral by " + user.getName(), htmlBody, job.getJdDocument());
    }
}
