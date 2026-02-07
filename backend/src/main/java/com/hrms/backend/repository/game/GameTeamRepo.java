package com.hrms.backend.repository.game;

import com.hrms.backend.entities.game.GameTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameTeamRepo extends JpaRepository<GameTeam, Long> {
}
