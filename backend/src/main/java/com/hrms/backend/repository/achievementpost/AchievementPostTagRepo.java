package com.hrms.backend.repository.achievementpost;

import com.hrms.backend.entities.achievementpost.AchievementPostTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AchievementPostTagRepo extends JpaRepository<AchievementPostTag, Long> {
    @Query("SELECT apt FROM AchievementPostTag apt WHERE apt.name like CONCAT('%',:query,'%')")
    List<AchievementPostTag> searchTags(@Param("searchText") String query);

    Optional<AchievementPostTag> findByName(String name);
}
