package com.hrms.backend.service.game;

import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.game.GameBooking;
import com.hrms.backend.entities.game.GameTeam;
import com.hrms.backend.repository.game.GameBookingRepo;
import com.hrms.backend.utilities.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FairPlayAlgorithmService {
    private final GameBookingRepo gameBookingRepo;

    public Constants.GameBookingStatusType getStatus(GameTeam team) {
        Game game = team.getGame();
        List<GameBooking> booking = gameBookingRepo.findBookingOfTeamByHours(game.getId(), team.getId(), team.getUser().getId(), game.getBookingCycleHours());
        if (!booking.isEmpty())
            return Constants.GameBookingStatusType.PENDING;
        else
            return Constants.GameBookingStatusType.CONFIRMED;
    }
}
