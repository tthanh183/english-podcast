package com.example.backend.repository;


import com.example.backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface INotificationRepository extends JpaRepository<Notification, Long> {
    @Query("SELECT n FROM Notification n WHERE n.user.id = :userId AND n.isRead = false ORDER BY n.dateTime DESC")
    List<Notification> findUnreadNotificationsByUserId(@Param("userId") Long userId);
    List<Notification> findByUserId(Long userId);
}
