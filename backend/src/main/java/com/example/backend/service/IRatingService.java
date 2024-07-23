package com.example.backend.service;

import com.example.backend.model.Episode;
import com.example.backend.model.User;

public interface IRatingService {
    void rate(Long userId, Long episodeId, int stars);
    int getRating(User user, Episode episode);
}
