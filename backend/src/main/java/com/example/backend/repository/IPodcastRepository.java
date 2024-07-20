package com.example.backend.repository;

import com.example.backend.model.Podcast;
import com.example.backend.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPodcastRepository extends JpaRepository<Podcast, Long> {
    List<Podcast> findPodcastsByUser(User user);
    List<Podcast> findPodcastsByTitleContaining(String title);
    Page<Podcast> findPodcastsByUserAndTitleContaining(User user, String search , Pageable pageable);
}
