package com.hrms.backend.entities.game;

import com.hrms.backend.entities.user.User;
import com.hrms.backend.utilities.Constants;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@ToString
@Table(name = "game_bookings")
public class GameBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private GameTeam team;

    @Column(name = "start_time")
    private Long startTime;

    @Column(name = "end_time")
    private Long endTime;

    @Column(name = "is_confirmed")
    private boolean isConfirmed;

    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "booked_slot_date")
    private Date bookedSlotDate;

    @Column(name = "is_deleted")
    private boolean isDeleted;

}
