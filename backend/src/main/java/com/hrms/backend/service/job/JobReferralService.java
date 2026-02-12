package com.hrms.backend.service.job;

import com.hrms.backend.dto.job.request.JobReferralEmailRequestDTO;
import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.game.GameBooking;
import com.hrms.backend.entities.jobs.Job;
import com.hrms.backend.entities.jobs.JobReferral;
import com.hrms.backend.entities.jobs.JobReviewStatus;
import com.hrms.backend.entities.jobs.ReferralReviewStatus;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.job.JobReferralRepo;
import com.hrms.backend.service.mail.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JobReferralService {
    private final JobService jobService;
    private final MailService mailService;
    private final JobReviewStatusService jobReviewStatusService;
    private final JobReferralRepo jobReferralRepo;

    public void referJobToEmails(Long jobId, User user, JobReferralEmailRequestDTO emails) throws BadRequestException {
        Job job = jobService.findById(jobId, true);
        JobReviewStatus status = jobReviewStatusService.findStatusByName(ReferralReviewStatus.NEW);

        List<JobReferral> referrals =
                emails.getEmails().stream().map(email -> {
                    JobReferral referral = new JobReferral();
                    referral.setEmail(email);
                    referral.setSharedBy(user);
                    referral.setStatus(status);
                    referral.setJob(job);
                    return referral;
                }).toList();
        jobReferralRepo.saveAll(referrals);
    }

    public void sendJobMail(Set<User> members, User user, GameBooking newBooking, Game game) throws MessagingException {
        String[] toEmails = new String[members.size() + 1];

        int i = 0;
        for (User singleUser : members) {
            toEmails[i++] = singleUser.getEmail();
        }
        toEmails[i] = user.getEmail();

        DateTimeFormatter formatToDate = DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss zzz yyyy");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate todayDate = LocalDate.now();
        LocalDate bookedDate = LocalDate.parse(newBooking.getBookedSlotDate().toString(), formatToDate);

        String htmlBody = """
                <div>
                <div>Congratulations your game slot is confirmed.</div>
                <div>Booking On: %s</div>
                <div>Booking Date: %s</div>
                <div>Start Time: %s</div>
                <div>End Time: %s</div>
                <div>Status: %s</div>
                </div>
                """.formatted(
                todayDate.format(formatter),
                bookedDate.format(formatter),
                newBooking.getStartTime() / 60 + ":" + newBooking.getStartTime() % 60,
                newBooking.getEndTime() / 60 + ":" + newBooking.getEndTime() % 60,
                Boolean.TRUE.equals(newBooking.getIsConfirmed()) ? "Confirmed" : "Pending");

        mailService.sendEmail(toEmails, game.getName() + " game slot is booked", htmlBody);
    }
}
