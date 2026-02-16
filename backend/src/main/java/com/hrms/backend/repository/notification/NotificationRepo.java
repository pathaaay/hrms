package com.hrms.backend.repository.notification;

import com.hrms.backend.entities.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findAllByAddedForIdOrAddedForIdIsNull(Long userId);
}
