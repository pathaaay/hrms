package com.hrms.backend.repository.achievementpost;

import com.hrms.backend.entities.achievementpost.AchievementPostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AchievementPostCommentRepo extends JpaRepository<AchievementPostComment, Long> {
    @Query("SELECT COUNT(*) FROM AchievementPostComment apl WHERE apl.post.id=:postId")
    Long getCommentsCountByPostId(@Param("postId") Long postId);

    @Query("SELECT apc,up from AchievementPostComment apc,UserProfile up WHERE up.user.id=apc.author.id AND apc.post.id=:postId AND (apc.deletedBy IS NULL OR apc.deletedBy.id <> :userId)")
    List<AchievementPostComment> findAllByPostId(@Param("postId") Long postId,@Param("userId")Long userId);

    Optional<AchievementPostComment> findByIdAndDeletedByIsNull(Long commentId);
}
