package com.hrms.backend.repository.user;

import com.hrms.backend.entities.user.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserId(Long id);

    @Query("SELECT u FROM UserProfile u JOIN u.interestedGames ig WHERE ig.id = :gameId")
    List<UserProfile> findAllByGameId(@Param("gameId") Long gameId);

    @Query("SELECT u FROM UserProfile u WHERE u.manager.id = :userId")
    List<UserProfile> findAllDirectReportUsers(@Param("userId") Long userId);

    @Query("SELECT u FROM UserProfile u WHERE u.user.name like CONCAT('%',:searchText,'%') OR u.user.email like CONCAT('%',:searchText,'%') ")
    List<UserProfile> searchUsers(@Param("searchText") String searchText);

    @Query("SELECT u FROM UserProfile u WHERE FUNCTION('MONTH',u.dateOfBirth) = FUNCTION('MONTH',CURRENT_TIMESTAMP) AND FUNCTION('DAY',u.dateOfBirth) = FUNCTION('DAY', CURRENT_TIMESTAMP)")
    List<UserProfile> findAllByBirthdayToday();

    @Query("SELECT u FROM UserProfile u WHERE FUNCTION('MONTH',u.dateOfJoining) = FUNCTION('MONTH',CURRENT_TIMESTAMP) AND FUNCTION('DAY',u.dateOfJoining) = FUNCTION('DAY', CURRENT_TIMESTAMP)")
    List<UserProfile> findAllByWorkAnniversaryToday();
}
