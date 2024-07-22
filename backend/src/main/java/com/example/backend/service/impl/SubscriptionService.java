package com.example.backend.service.impl;

import com.example.backend.model.Podcast;
import com.example.backend.model.Subscription;
import com.example.backend.model.User;
import com.example.backend.repository.ISubscriptionRepository;
import com.example.backend.service.IPodcastService;
import com.example.backend.service.ISubscriptionService;
import com.example.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService implements ISubscriptionService {
    private final ISubscriptionRepository subscriptionRepository;
    private final IUserService userService;
    private final IPodcastService podcastService;

    @Override
    public List<Podcast> findTopRecentSubscribedPodcasts(Long userId, int limit) {
        return subscriptionRepository.findTopRecentSubscribedPodcasts(userId, limit);
    }

    @Override
    public List<Subscription> findSubscriptionsByUser(User user) {
        return subscriptionRepository.findAllByUser(user);
    }

    @Override
    public void deleteSubscription(Subscription existingSubscription) {
        subscriptionRepository.delete(existingSubscription);
    }

    @Override
    public void saveSubscription(Subscription newSubscription) {
        subscriptionRepository.save(newSubscription);
    }

    @Override
    public void subscribe(Long userId, Long podcastId) {
        User user = userService.findUserById(userId).get();
        Podcast podcast = podcastService.findPodcastById(podcastId);
        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setPodcast(podcast);
        subscription.setDate(LocalDateTime.now());
        subscriptionRepository.save(subscription);
    }

    @Override
    public void unsubscribe(Long userId, Long podcastId) {
        User user = userService.findUserById(userId).get();
        Podcast podcast = podcastService.findPodcastById(podcastId);
        Subscription subscription = subscriptionRepository.findByUserAndPodcast(user, podcast);
        if (subscription != null) {
            subscriptionRepository.delete(subscription);
        }
    }


    @Override
    public boolean existsSubscriptionsByUserAndPodcast(User user, Podcast podcast) {
        return subscriptionRepository.existsSubscriptionsByUserAndPodcast(user, podcast);
    }
}
