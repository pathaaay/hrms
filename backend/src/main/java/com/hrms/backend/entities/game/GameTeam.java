package com.hrms.backend.entities.game;

import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@ToString
@Table(name = "user_interested_games")
public class GameTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game gameId;

    @ManyToOne
    @JoinColumn(name = "leader_id")
    private User user;
}
