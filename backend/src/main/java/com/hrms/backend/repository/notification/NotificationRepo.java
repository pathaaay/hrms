package com.hrms.backend.repository.notification;

import com.hrms.backend.entities.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findAllByUserId(Long userId);
}
