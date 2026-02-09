package com.hrms.backend.repository.game;

import com.hrms.backend.dto.response.BookedGameSlotsResponseDTO;
import com.hrms.backend.entities.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface GameRepo extends JpaRepository<Game, Long> {
//    List<Object> getAllBookedSlots(int id, Date fromDate, Date toDate);
}
