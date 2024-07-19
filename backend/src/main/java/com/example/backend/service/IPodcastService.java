package com.example.backend.service;

import com.example.backend.model.Podcast;
import com.example.backend.model.User;

import java.util.List;

public interface IPodcastService {
    List<Podcast> findPodcastByUser(User user);
    Podcast savePodcast(Podcast podcast);
    void deletePodcast(Podcast podcast);
    Podcast updatePodcast(Podcast podcast);

    Podcast findPodcastById(Long id);
}
