package com.hrms.backend.repository.achievementpost;

import com.hrms.backend.entities.achievementpost.AchievementPostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AchievementPostLikeRepo extends JpaRepository<AchievementPostLike, Long> {
    @Query("SELECT COUNT(*) FROM AchievementPostLike apl WHERE apl.post.id=:postId")
    Long getLikesCountByPostId(@Param("postId") Long postId);

    Optional<AchievementPostLike> findByLikedBy_IdAndPost_id(Long userId,Long postId);

    List<AchievementPostLike> findAllByPost_Id(Long postId);
}
