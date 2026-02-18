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

    @Query("SELECT ap FROM AchievementPost ap JOIN FETCH ap.visibleToUsers vtu WHERE ap.deletedBy Is NULL AND (ap.isPublic=true OR vtu.id=:userId) ORDER BY ap.createdAt DESC")
    List<AchievementPost> findAllPosts(@Param("userId") Long userId);

    List<AchievementPost> findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullOrderByCreatedAtDesc(Long userId);

    List<AchievementPost> findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullAndAuthor_IdOrderByCreatedAtDesc(Long visibleToUserId, Long userId);

    List<AchievementPost> findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullAndAchievementPostTags_IdOrderByCreatedAtDesc(Long userId, Long tagId);

    @Query("SELECT ap from AchievementPost ap WHERE (ap.deletedBy.id != :userId OR ap.deletedBy IS NULL) AND ap.author.id=:userId")
    List<AchievementPost> findAllByDeletedById(@Param("userId") Long userId);
}

