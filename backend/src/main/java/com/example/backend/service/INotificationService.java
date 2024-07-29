package com.example.backend.service;

import com.example.backend.model.Notification;

import java.util.List;

public interface INotificationService {
    Notification save(Notification notification);
    List<Notification> findUnreadByUserId(Long userId);
    void markAllAsRead(Long notificationId);

}
