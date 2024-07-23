package com.example.backend.controller;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Episode;
import com.example.backend.model.User;
import com.example.backend.service.IEpisodeService;
import com.example.backend.service.IRatingService;
import com.example.backend.service.IUserService;
import com.example.backend.service.impl.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {
    private final IRatingService ratingService;
    private final IUserService userService;
    private final IEpisodeService episodeService;
    @GetMapping
    public ResponseEntity<?> getRating(@RequestParam Long episodeId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            User user = userService.findUserByEmail(email);

            Episode episode = episodeService.findEpisodeById(episodeId);
            int rating = ratingService.getRating(user, episode);
            return ResponseEntity.ok(rating);
        }catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while geting rating.");
        }
    }
    @PostMapping
    public ResponseEntity<?> addRating(@RequestParam Long episodeId, @RequestParam Integer stars) {
        try {
            if (stars < 1 || stars > 5) {
                return ResponseEntity.badRequest().body("Rating must be between 1 and 5 stars.");
            }

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            User user = userService.findUserByEmail(email);

            ratingService.rate(user.getId(), episodeId, stars);

            return ResponseEntity.ok("Rating saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while saving rating.");
        }
    }
}
