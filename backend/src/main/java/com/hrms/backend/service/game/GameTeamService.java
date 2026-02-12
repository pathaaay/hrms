package com.hrms.backend.service.game;

import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.game.GameTeam;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.game.GameTeamRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class GameTeamService {
    private final GameTeamRepo gameTeamRepo;

    public GameTeam createTeam(Game game, User user, Set<User> members) {
        GameTeam team = new GameTeam();
        team.setGame(game);
        team.setUser(user);
        team.setGameTeamMembers(members);
        return gameTeamRepo.save(team);
    }

}
