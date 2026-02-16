package com.hrms.backend.controller.notification;

import com.hrms.backend.dto.notifications.response.NotificationResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.notification.NotificationService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<NotificationResponseDTO>>> getAllNotifications(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Notifications get successfully", notificationService.getAllNotifications(user.getId())));
    }

    @PatchMapping("/{notificationId}")
    public ResponseEntity<ApiResponse> markAsRead(@PathVariable("notificationId") Long notificationId) throws BadRequestException {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Notification read successfully", null));
    }
}
