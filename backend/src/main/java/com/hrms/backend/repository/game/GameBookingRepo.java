package com.hrms.backend.repository.game;

import com.hrms.backend.entities.game.GameBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GameBookingRepo extends JpaRepository<GameBooking, Long> {
    @Query(value = "SELECT g from GameBooking g  JOIN g.team t JOIN t.gameTeamMembers gtm WHERE (gtm.id = :userId OR t.id = :userId) AND g.bookedSlotDate > DATEADD(HOUR,-:bookingCycleHours,GETDATE())", nativeQuery = true)
    Optional<GameBooking> findBookingOfUserByHours(Long userId, int bookingCycleHours);
}
