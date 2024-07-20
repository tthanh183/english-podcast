package com.example.backend.controller;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Genre;
import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import com.example.backend.service.IGenreService;
import com.example.backend.service.IPodcastService;
import com.example.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/podcasts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PodcastController {
    private final IPodcastService podcastService;
    private final IUserService userService;
    private final IGenreService genreService;
    @GetMapping()
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> findAllPodcasts(@RequestParam int page, @RequestParam String search) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.findUserByEmail(userDetails.getUsername());

            Pageable pageable = PageRequest.of(page,4);
            Page<Podcast> podcasts = podcastService.findPodcastsByUserAndTitleContaining(user,search,   pageable);
            return new ResponseEntity<>(podcasts, HttpStatus.OK);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return new ResponseEntity<>("An error occurred while fetching podcasts", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping()
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createPodcast(@RequestBody Podcast podcast) {
        if (podcast == null) {
            return new ResponseEntity<>("Podcast cannot be null", HttpStatus.BAD_REQUEST);
        }

        List<Genre> managedGenres = new ArrayList<>();
        for (Genre genre : podcast.getGenres()) {
            Genre managedGenre = genreService.findById(genre.getId());
            if (managedGenre != null) {
                managedGenres.add(managedGenre);
            }
        }
        podcast.setGenres(managedGenres);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findUserByEmail(userDetails.getUsername());
        podcast.setUser(user);
        Podcast savedPodcast = podcastService.savePodcast(podcast);
        return new ResponseEntity<>(savedPodcast, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updatePodcast(@PathVariable Long id ,@RequestBody Podcast podcast) {
        if (podcast == null) {
            return new ResponseEntity<>("Podcast cannot be null", HttpStatus.BAD_REQUEST);
        }
        Podcast savedPodcast;
        try {
            Podcast updatedPodcast = podcastService.findPodcastById(id);

            updatedPodcast.setTitle(podcast.getTitle());
            updatedPodcast.setDescription(podcast.getDescription());
            updatedPodcast.setGenres(podcast.getGenres());
            updatedPodcast.setImage(podcast.getImage());
            updatedPodcast.setUpdatedDate(podcast.getUpdatedDate());

            savedPodcast = podcastService.savePodcast(updatedPodcast);
            return new ResponseEntity<>(savedPodcast, HttpStatus.OK);

        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error when updating podcast", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deletePodcast(@PathVariable Long id) {
        try {
            Podcast podcast = podcastService.findPodcastById(id);
            podcastService.deletePodcast(podcast);
            return new ResponseEntity<>("Delete podcast successfully", HttpStatus.OK);
        }catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
