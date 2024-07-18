package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import com.example.backend.repository.IPodcastRepository;
import com.example.backend.service.IPodcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PodcastService implements IPodcastService {
    private final IPodcastRepository podcastRepository;

    @Override
    public List<Podcast> findPodcastByUser(User user) {
        if(user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        List<Podcast> podcasts = podcastRepository.findPodcastByUser(user);
        if(podcasts.isEmpty()) {
            throw new ResourceNotFoundException("No podcast found");
        }
        return podcasts;
    }
}
