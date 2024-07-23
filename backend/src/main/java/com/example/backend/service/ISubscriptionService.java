package com.example.backend.service;

import com.example.backend.model.Podcast;
import com.example.backend.model.Subscription;
import com.example.backend.model.User;

import java.util.List;

public interface ISubscriptionService {
    List<Podcast> findTopRecentSubscribedPodcasts(Long userId, int limit);
    void subscribe(Long userId, Long podcastId);
    void unsubscribe(Long userId, Long podcastId);
    boolean existsSubscriptionsByUserAndPodcast(User user, Podcast podcast);
}
