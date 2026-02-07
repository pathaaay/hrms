package com.hrms.backend.repository;

import com.hrms.backend.entities.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepo extends JpaRepository<Game, Long> {
}
