package com.hrms.backend.repository.game;

import com.hrms.backend.entities.game.GameBooking;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface GameBookingRepo extends JpaRepository<GameBooking, Long> {
    String query = """
            SELECT gb.*
            from game_bookings gb
            JOIN game_teams gt ON gt.leader_id = :leaderId
            WHERE
            gb.is_deleted <> 1 AND
            gb.team_id = gt.id AND
            gb.booked_slot_date > DATEADD(HOUR,-:bookingCycleHours,GETDATE())
            """;

    @Query(value = query, nativeQuery = true)
    List<GameBooking> findBookingOfTeamByHours(@Param("gameId") Long gameId, @Param("teamId") Long teamId, @Param("leaderId") Long leaderId, @Param("bookingCycleHours") int bookingCycleHours);

    @Query("SELECT gb from GameBooking gb where gb.isConfirmed = true AND gb.team.game.id=:gameId AND gb.isDeleted <> true AND gb.bookedSlotDate BETWEEN :fromDate AND :toDate")
    List<GameBooking> getBookedSlotsByGameId(@Param("gameId") Long gameId, @Param("fromDate") Date fromDate, @Param("toDate") Date toDate);

    @Query("SELECT gb from GameBooking gb JOIN FETCH gb.team WHERE gb.isDeleted <> true AND gb.team.user.id=:userId")
    List<GameBooking> getBookingsByUserId(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE GameBooking b SET b.isDeleted=true where b.team.user.id=:userId and b.id=:bookingId")
    int deleteBooking(@Param("userId") Long userId, @Param("bookingId") Long bookingId);
}
