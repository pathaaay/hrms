package com.hrms.backend.repository.achievementpost;

import com.hrms.backend.entities.achievementpost.AchievementPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AchievementPostRepo extends JpaRepository<AchievementPost, Long> {
    Optional<AchievementPost> findByIdAndAuthor_IdAndDeletedBy_Id(Long id, Long createdById, Long deletedById);

    Optional<AchievementPost> findByIdAndDeletedBy_Id(Long id, Long deletedById);

    List<AchievementPost> findAllByDeletedByIsNullOrderByCreatedAtDesc();

    List<AchievementPost> findAllByDeletedByIsNullAndAuthor_IdOrderByCreatedAtDesc(Long id);

    List<AchievementPost> findAllByDeletedByIsNullAndAchievementPostTags_IdOrderByCreatedAtDesc(Long id);

    @Query("SELECT ap from AchievementPost ap WHERE (ap.deletedBy.id != :userId OR ap.deletedBy IS NULL) AND ap.author.id=:userId")
    List<AchievementPost> findAllByDeletedBy_Id(@Param("userId") Long userId);
}

