package com.example.backend.controller;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Podcast;
import com.example.backend.model.Subscription;
import com.example.backend.model.User;
import com.example.backend.service.IPodcastService;
import com.example.backend.service.ISubscriptionService;
import com.example.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    private final ISubscriptionService subscriptionService;
    private final IUserService userService;
    private final IPodcastService podcastService;
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> findTopRecentSubscribedPodcasts(@RequestParam int limit) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            User user = userService.findUserByEmail(email);

            List<Podcast> recentSubscribedPodcasts = subscriptionService.findTopRecentSubscribedPodcasts(user.getId(), limit);
            return ResponseEntity.ok(recentSubscribedPodcasts);
        }catch (Exception e) {
            return new ResponseEntity<>("An error occurred while fetching subscription", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> toggleSubscription(@RequestParam Long podcastId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            User user = userService.findUserByEmail(email);

            Podcast podcast = podcastService.findPodcastById(podcastId);

            boolean isSubscribed = subscriptionService.existsSubscriptionsByUserAndPodcast(user, podcast);
            if (isSubscribed) {
                subscriptionService.unsubscribe(user.getId(), podcastId);
                return ResponseEntity.ok("Unsubscribed successfully");
            } else {
                subscriptionService.subscribe(user.getId(), podcastId);
                return ResponseEntity.ok("Subscribed successfully");
            }
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while processing subscription", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/exists")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> isSubscriptionExist(@RequestParam Long podcastId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            User user = userService.findUserByEmail(email);
            Podcast podcast = podcastService.findPodcastById(podcastId);
            boolean isExists = subscriptionService.existsSubscriptionsByUserAndPodcast(user, podcast);
            return ResponseEntity.ok(isExists);
        }catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
