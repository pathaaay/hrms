package com.hrms.backend.entities.game;

import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@ToString
@Table(name = "game_teams")
public class GameTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "leader_id")
    private User user;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "game_team_members",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> gameTeamMembers;
}
