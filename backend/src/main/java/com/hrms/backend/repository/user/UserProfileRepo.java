package com.hrms.backend.repository.user;

import com.hrms.backend.entities.user.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserProfileRepo extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserId(Long id);

    @Query("SELECT u FROM UserProfile u JOIN u.interestedGames ig WHERE ig.id = :gameId")
    List<UserProfile> findAllByGameId(Long gameId);
}
