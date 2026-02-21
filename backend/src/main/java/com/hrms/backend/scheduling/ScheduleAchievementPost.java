package com.hrms.backend.scheduling;

import com.hrms.backend.dto.achievementpost.request.AchievementPostRequestDTO;
import com.hrms.backend.entities.travel.Travel;
import com.hrms.backend.entities.user.UserProfile;
import com.hrms.backend.service.achievementpost.AchievementPostService;
import com.hrms.backend.service.user.UserProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@Slf4j
@RequiredArgsConstructor
public class ScheduleAchievementPost {
    private final AchievementPostService achievementPostService;
    private final UserProfileService userProfileService;
    Set<String> tags = new HashSet<>();

    @Scheduled(cron = "0 25 13 * * *")
    public void createBirthdayPost() {
        tags.clear();
        tags.add("Birthday");
        tags.add("System");
        List<UserProfile> users = userProfileService.findAllByBirthdayToday();
        for (UserProfile user : users) {
            AchievementPostRequestDTO post = new AchievementPostRequestDTO();
            post.setTitle("Happy Birthday to " + user.getUser().getName());
            post.setDescription("Wishing you a many many happy returns of the day");
            post.setIsPublic(true);
            post.setNewTags(tags);
            achievementPostService.createPost(post, null);
            log.info("birthday post created by system for {}", user.getUser().getName());
        }
    }

    @Scheduled(cron = "0 30 13 * * *")
    public void createWorkAnniversaryPostPost() {
        tags.clear();
        tags.add("Work Anniversary");
        tags.add("System");
        List<UserProfile> users = userProfileService.findAllByWorkAnniversaryToday();
        for (UserProfile user : users) {
            int difference = getDiffInYears(user.getDateOfJoining());
            AchievementPostRequestDTO post = new AchievementPostRequestDTO();
            String userName = user.getUser().getName();
            post.setTitle("Work Anniversary: " + userName);
            post.setDescription("Today " + userName + " has completed " + difference + " years in Roima Intelligence");
            post.setIsPublic(true);
            post.setNewTags(tags);
            achievementPostService.createPost(post, null);
            log.info("Work Anniversary post created by system for {}", user.getUser().getName());
        }
    }

    private static int getDiffInYears(Date date) {
        Date today = new Date();
        return (int) ((today.getTime() - date.getTime())
                / (1000 * 60 * 60 * 24 * 12));
    }
}
