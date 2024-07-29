package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Episode;
import com.example.backend.model.Notification;
import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import com.example.backend.repository.IEpisodeRepository;
import com.example.backend.service.IEpisodeService;
import com.example.backend.service.INotificationService;
import com.example.backend.service.ISubscriptionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EpisodeService implements IEpisodeService {
    private static final Logger log = LoggerFactory.getLogger(EpisodeService.class);
    private final IEpisodeRepository episodeRepository;
    private final ISubscriptionService subscriptionService;
    private final INotificationService notificationService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private UserService userService;

    @Override
    public Episode saveEpisode(Episode episode) {
        Episode savedEpisode = episodeRepository.save(episode);
        notifySubscribers(savedEpisode);
        return savedEpisode;
    }

    @Override
    public void deleteEpisode(Episode episode) {
        episodeRepository.delete(episode);
    }

    @Override
    public Episode findEpisodeById(Long id) {
        return episodeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Episode not exist with id: " + id));
    }

    @Override
    public Page<Episode> findEpisodeByPodcastAndTitleContainingOrderByCreatedDateDesc(Podcast podcast, String search, Pageable pageable) {
        if(podcast == null) {
            throw new IllegalArgumentException("Podcast cannot be null");
        }
        Page<Episode> episodes = episodeRepository.findEpisodeByPodcastAndTitleContainingOrderByCreatedDateDesc(podcast, search, pageable);
        if(episodes.getTotalElements() == 0) {
            throw new ResourceNotFoundException("No episode found");
        }
        return episodes;
    }

    private void notifySubscribers(Episode episode) {
        Podcast podcast = episode.getPodcast();
        List<Long> subscriberIds = subscriptionService.findSubscribersByPodcastId(podcast.getId());
        log.info("Subscriber IDs: {}", subscriberIds);

        List<User> subscribers = subscriberIds.stream()
                .map(userId -> userService.findUserById(userId).orElse(null))
                .filter(user -> user != null)
                .collect(Collectors.toList());

        for (User subscriber : subscribers) {
            Notification notification = new Notification();
            notification.setUser(subscriber);
            notification.setPodcast(episode.getPodcast());
            notification.setMessage("New episode available: " + episode.getTitle() + "on " + podcast.getTitle());
            notification.setDateTime(LocalDateTime.now());
            notification.setRead(false);
            Notification savedNotification = notificationService.save(notification);
            messagingTemplate.convertAndSend("/topic/notifications/" + subscriber.getId(), savedNotification);
        }
    }
}
