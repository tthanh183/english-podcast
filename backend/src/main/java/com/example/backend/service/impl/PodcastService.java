package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import com.example.backend.repository.IPodcastRepository;
import com.example.backend.service.IPodcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;

@Service
@RequiredArgsConstructor
public class PodcastService implements IPodcastService {
    private final IPodcastRepository podcastRepository;

    @Override
    public List<Podcast> findAll() {
        return podcastRepository.findAll();
    }

    @Override
    public Podcast savePodcast(Podcast podcast) {
        return podcastRepository.save(podcast);
    }

    @Override
    public void deletePodcast(Podcast podcast) {
        podcastRepository.delete(podcast);
    }

    @Override
    public Podcast findPodcastById(Long id) {
        return podcastRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Podcast not exist with id: " + id));
    }

    @Override
    public Page<Podcast> findPodcastsByUserAndTitleContaining(User user, String search, Pageable pageable) {
        if(user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        Page<Podcast> podcasts = podcastRepository.findPodcastsByUserAndTitleContaining(user, search, pageable);
        if(podcasts.getTotalElements() == 0) {
            throw new ResourceNotFoundException("No podcast found");
        }
        return podcasts;
    }

    @Override
    public List<Podcast> findNewReleasedPodcasts(Pageable pageable) {
        return podcastRepository.findAllByOrderByCreatedDateDesc(pageable);
    }

    @Override
    public List<Podcast> findTopRatedPodcasts(Pageable pageable) {
        List<Object[]> results = podcastRepository.findTopRatedPodcasts(pageable);
        List<Podcast> podcasts = new ArrayList<>();
        for (Object[] result : results) {
            Podcast podcast = (Podcast) result[0];
            double avgRating = (double) result[1];
            podcast.setAvgRating(avgRating); // Cần thêm trường averageRating vào model Podcast
            podcasts.add(podcast);
        }
        return podcasts;
    }

}
