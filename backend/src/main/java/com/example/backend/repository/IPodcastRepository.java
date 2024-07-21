package com.example.backend.repository;

import com.example.backend.model.Podcast;
import com.example.backend.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IPodcastRepository extends JpaRepository<Podcast, Long> {
    Page<Podcast> findPodcastsByUserAndTitleContaining(User user, String search , Pageable pageable);
    List<Podcast> findAllByOrderByCreatedDateDesc(Pageable pageable);
    @Query(value = "SELECT p, AVG(r.rates) as avgRating FROM podcast p JOIN rating r ON p.id = r.podcast_id GROUP BY p.id ORDER BY avgRating DESC", nativeQuery = true)
    List<Object[]> findTopRatedPodcasts(Pageable pageable);

}
