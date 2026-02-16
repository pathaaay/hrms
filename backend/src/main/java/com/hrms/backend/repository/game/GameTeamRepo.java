package com.hrms.backend.repository.game;

import com.hrms.backend.entities.game.GameTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameTeamRepo extends JpaRepository<GameTeam, Long> {
}
