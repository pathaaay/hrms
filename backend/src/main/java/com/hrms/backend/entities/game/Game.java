package com.hrms.backend.entities.game;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "start_time", nullable = false)
    private int startTime;

    @Column(name = "end_time", nullable = false)
    private int endTime;

    @Column(name = "booking_cycle_hours", nullable = false)
    private int bookingCycleHours;

    @Column(name = "max_slot_duration_in_minutes", nullable = false)
    private int maxSlotDurationInMinutes;

    @Column(name = "max_players_per_slot", nullable = false)
    private int maxPlayersPerSlot;

    @Column(name = "is_active",nullable = false, columnDefinition = "BIT default 1")
    private boolean isActive;
}
