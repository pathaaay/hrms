package com.hrms.backend.repository.game;

import com.hrms.backend.entities.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepo extends JpaRepository<Game, Long> {
    List<Game> findByIsActiveTrue();
}
