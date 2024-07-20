package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Episode;
import com.example.backend.model.Podcast;
import com.example.backend.repository.IEpisodeRepository;
import com.example.backend.service.IEpisodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EpisodeService implements IEpisodeService {
    private final IEpisodeRepository episodeRepository;

    @Override
    public Episode saveEpisode(Episode episode) {
        return episodeRepository.save(episode);
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
    public Page<Episode> findEpisodeByPodcastAndTitleContaining(Podcast podcast, String search, Pageable pageable) {
        if(podcast == null) {
            throw new IllegalArgumentException("Podcast cannot be null");
        }
        Page<Episode> episodes = episodeRepository.findEpisodeByPodcastAndTitleContaining(podcast, search, pageable);
        if(episodes.getTotalElements() == 0) {
            throw new ResourceNotFoundException("No episode found");
        }
        return episodes;
    }
}
