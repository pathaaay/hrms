package com.hrms.backend.repository.game;

import com.hrms.backend.entities.game.GameBooking;
import org.springframework.data.jpa.repository.JpaRepository;
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
            gb.team_id = gt.id AND
            gb.booked_slot_date > DATEADD(HOUR,-:bookingCycleHours,GETDATE())
            """;

    @Query(value = query, nativeQuery = true)
    List<GameBooking> findBookingOfTeamByHours(@Param("gameId") Long gameId, @Param("teamId") Long teamId, @Param("leaderId") Long leaderId, @Param("bookingCycleHours") int bookingCycleHours);

    @Query("SELECT gb from GameBooking gb where gb.team.game.id=:gameId AND gb.bookedSlotDate BETWEEN :fromDate AND :toDate")
    List<GameBooking> getBookedSlotsByGameId(@Param("gameId") Long gameId, @Param("fromDate") Date fromDate,@Param("toDate") Date toDate);
}
