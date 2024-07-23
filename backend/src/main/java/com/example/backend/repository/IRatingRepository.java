package com.example.backend.repository;

import com.example.backend.model.Episode;
import com.example.backend.model.Rating;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRatingRepository extends JpaRepository<Rating, Integer> {
    Optional<Rating> findByUserAndEpisode(User user, Episode episode);
}
