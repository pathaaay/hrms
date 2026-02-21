package com.hrms.backend.entities.achievementpost;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "acheivement_post_tags")
public class AchievementPostTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "added_by_id")
    private User addedBy;
}
