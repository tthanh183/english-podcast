package com.example.backend.service;

import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IPodcastService {
    Podcast savePodcast(Podcast podcast);
    void deletePodcast(Podcast podcast);
    Podcast findPodcastById(Long id);
    Page<Podcast> findPodcastsByUserAndTitleContaining(User user, String search, Pageable pageable);
    List<Podcast> findNewReleasedPodcasts(Pageable pageable);
    List<Podcast> findTopRatedPodcasts(Pageable pageable);

    List<Podcast> findAll();
}
