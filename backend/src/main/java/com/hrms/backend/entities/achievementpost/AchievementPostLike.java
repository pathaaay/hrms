package com.hrms.backend.entities.achievementpost;

import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "achievement_post_likes")
public class AchievementPostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private AchievementPost post;

    @ManyToOne
    @JoinColumn(name = "liked_by_id")
    private User likedBy;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;
}
