package com.example.backend.service;

import com.example.backend.model.Podcast;
import com.example.backend.model.User;

import java.util.List;

public interface IPodcastService {
    List<Podcast> findPodcastByUser(User user);
}
