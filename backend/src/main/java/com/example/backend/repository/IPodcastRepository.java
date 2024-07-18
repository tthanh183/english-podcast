package com.example.backend.repository;

import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPodcastRepository extends JpaRepository<Podcast, Long> {
    List<Podcast> findPodcastByUser(User user);
}
