package com.hrms.backend.service.game;

import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.game.GameBooking;
import com.hrms.backend.entities.game.GameTeam;
import com.hrms.backend.repository.game.GameBookingRepo;
import com.hrms.backend.repository.game.GameRepo;
import com.hrms.backend.repository.game.GameTeamRepo;
import com.hrms.backend.utilities.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@RequiredArgsConstructor
public class FairPlayAlgorithmService {
    private final GameBookingRepo gameBookingRepo;

    public Constants.GameBookingStatusType getStatus(GameTeam team) {
        AtomicInteger flag = new AtomicInteger();
        Game game = team.getGame();
        int bookingCycleHours = game.getBookingCycleHours();
        team.getGameTeamMembers().stream().map(member -> {
            Optional<GameBooking> booking = gameBookingRepo.findBookingOfUserByHours(member.getId(), bookingCycleHours);
            if (booking.isPresent()) flag.incrementAndGet();
            return member;
        });

        if (flag.get() > 0)
            return Constants.GameBookingStatusType.PENDING;
        else
            return Constants.GameBookingStatusType.CONFIRMED;
    }
}
