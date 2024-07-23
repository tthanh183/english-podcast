package com.example.backend.service.impl;

import com.example.backend.model.Episode;
import com.example.backend.model.Rating;
import com.example.backend.model.User;
import com.example.backend.repository.IRatingRepository;
import com.example.backend.service.IEpisodeService;
import com.example.backend.service.IRatingService;
import com.example.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RatingService implements IRatingService {
    private final IRatingRepository ratingRepository;
    private final IUserService userService;
    private final IEpisodeService episodeService;


    @Override
    public void rate(Long userId, Long episodeId, int stars) {
        User user = userService.findUserById(userId).get();
        Episode episode = episodeService.findEpisodeById(episodeId);

        Rating rating = ratingRepository.findByUserAndEpisode(user, episode)
                .orElse(new Rating(user, episode));

        rating.setStars(stars);
        rating.setCreatedDate(LocalDateTime.now());
        ratingRepository.save(rating);
    }

    @Override
    public int getRating(User user, Episode episode) {
        return ratingRepository.findByUserAndEpisode(user, episode)
                .map(Rating::getStars)
                .orElse(0);
    }
}
