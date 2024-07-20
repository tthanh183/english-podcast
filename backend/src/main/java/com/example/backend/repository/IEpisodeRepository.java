package com.example.backend.repository;

import com.example.backend.model.Episode;
import com.example.backend.model.Podcast;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IEpisodeRepository extends JpaRepository<Episode, Long> {
    List<Episode> findEpisodesByPodcast(Podcast podcast);
    Page<Episode> findEpisodesByPodcast(Podcast podcast, Pageable pageable);

}
