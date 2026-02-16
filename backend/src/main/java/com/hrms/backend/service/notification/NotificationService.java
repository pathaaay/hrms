package com.hrms.backend.service.notification;

import com.hrms.backend.dto.notifications.response.NotificationResponseDTO;
import com.hrms.backend.entities.notification.Notification;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.notification.NotificationRepo;
import lombok.RequiredArgsConstructor;
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
        return convertToDTOList(notificationRepo.findAllByUserId(userId));
    }
}
