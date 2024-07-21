package com.example.backend.repository;

import com.example.backend.model.Episode;
import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IEpisodeRepository extends JpaRepository<Episode, Long> {
    Page<Episode> findEpisodeByPodcastAndTitleContainingOrderByCreatedDateDesc(Podcast podcast, String search, Pageable pageable);
}
