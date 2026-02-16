package com.hrms.backend.controller.notification;

import com.hrms.backend.dto.notifications.response.NotificationResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.notification.NotificationService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<NotificationResponseDTO>>> getAllNotifications(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Notifications get successfully", notificationService.getAllNotifications(user.getId())));
    }
}
