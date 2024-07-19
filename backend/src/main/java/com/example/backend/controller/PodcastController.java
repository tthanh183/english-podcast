package com.example.backend.controller;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import com.example.backend.service.IPodcastService;
import com.example.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/podcasts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PodcastController {
    private final IPodcastService podcastService;
    private final IUserService userService;
    @GetMapping()
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> findAllPodcasts() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.findUserByEmail(userDetails.getUsername());
            List<Podcast> podcasts = podcastService.findPodcastByUser(user);
            return new ResponseEntity<>(podcasts, HttpStatus.OK);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return new ResponseEntity<>("An error occurred while fetching podcasts", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping()
    public ResponseEntity<?> createPodcast(@RequestBody Podcast podcast) {
        if (podcast == null) {
            return new ResponseEntity<>("Podcast cannot be null", HttpStatus.BAD_REQUEST);
        }
        Podcast savedPodcast = podcastService.savePodcast(podcast);
        return new ResponseEntity<>(savedPodcast, HttpStatus.CREATED);
    }
    @PutMapping("/:id")
    public ResponseEntity<?> updatePodcast(@RequestBody Podcast podcast) {
        if (podcast == null) {
            return new ResponseEntity<>("Podcast cannot be null", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(podcastService.updatePodcast(podcast), HttpStatus.OK);
    }
    @DeleteMapping("/:id")
    public ResponseEntity<?> deletePodcast(@RequestBody Podcast podcast) {
        if (podcast == null) {
            return new ResponseEntity<>("Podcast cannot be null", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Delete podcast successfully", HttpStatus.OK);
    }
}
