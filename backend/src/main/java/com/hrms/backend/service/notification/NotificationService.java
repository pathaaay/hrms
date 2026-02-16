package com.hrms.backend.service.notification;

import com.hrms.backend.dto.notifications.response.NotificationResponseDTO;
import com.hrms.backend.entities.notification.Notification;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.notification.NotificationRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepo notificationRepo;
    private final ModelMapper modelMapper;

    public NotificationResponseDTO convertToDTO(Notification notification) {
        return modelMapper.map(notification, NotificationResponseDTO.class);
    }

    public List<NotificationResponseDTO> convertToDTOList(List<Notification> notifications) {
        return notifications.stream().map(this::convertToDTO).toList();
    }

    public List<NotificationResponseDTO> getAllNotifications(Long userId) {
        return convertToDTOList(notificationRepo.findAllByAddedForIdOrAddedForIdIsNull(userId));
    }

    @Transactional
    public void addNotification(String title, String description, User addedFor) {
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setDescription(description);
        notification.setIsRead(false);
        if (addedFor != null) notification.setAddedFor(addedFor);
        notificationRepo.save(notification);
    }

    @Transactional
    public void markAsRead(Long notificationId) throws BadRequestException {
        Notification notification = notificationRepo.findById(notificationId).orElseThrow(() -> new BadRequestException("Notification not found"));
        notification.setIsRead(true);
        notificationRepo.save(notification);
    }
}
