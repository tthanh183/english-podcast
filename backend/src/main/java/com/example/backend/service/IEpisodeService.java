package com.example.backend.service;

import com.example.backend.model.Episode;
import com.example.backend.model.Podcast;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IEpisodeService {
    Episode saveEpisode(Episode episode);
    void deleteEpisode(Episode episode);
    Episode findEpisodeById(Long id);
    Page<Episode> findEpisodeByPodcastAndTitleContaining(Podcast podcast, String search, Pageable pageable);
}
