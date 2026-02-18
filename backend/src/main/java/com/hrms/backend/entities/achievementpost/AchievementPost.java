package com.hrms.backend.entities.achievementpost;

import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "achievement_posts")
public class AchievementPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private String title;
    private String description;

    @Column(name = "created_at")
    @CreationTimestamp
    private String createdAt;

    @Column(name = "is_public")
    private Boolean isPublic;

    @ManyToOne
    @JoinColumn(name = "deleted_by_id")
    private User deletedBy;

    private String remarks;

    @ManyToMany()
    @JoinTable(
            name = "achievement_post_author_tags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<AchievementPostTag> achievementPostTags;
}
