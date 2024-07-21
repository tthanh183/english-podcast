package com.example.backend.controller;

import com.example.backend.exception.ResourceNotFoundException;

import com.example.backend.model.Podcast;
import com.example.backend.service.IGenreService;
import com.example.backend.service.IPodcastService;
import com.example.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> findAllPodcasts(@RequestParam int page, @RequestParam String search) {
        try {
            List<Podcast> podcasts = podcastService.findAll();
            return new ResponseEntity<>(podcasts, HttpStatus.OK);
        }catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity<>("An error occurred while fetching podcasts", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPodcastById(@PathVariable Long id) {
        try {
            Podcast podcast = podcastService.findPodcastById(id);
            return new ResponseEntity<>(podcast, HttpStatus.OK);
        }catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/new-released")
    public ResponseEntity<?> getNewReleasedPodcast() {
        Pageable pageable = PageRequest.of(0, 6);
        List<Podcast> podcasts = podcastService.findNewReleasedPodcasts(pageable);
        return new ResponseEntity<>(podcasts, HttpStatus.OK);
    }

    @GetMapping("/top-rated")
    public ResponseEntity<?> getMostLovedPodcast() {
        Pageable pageable = PageRequest.of(0, 6);
        List<Podcast> podcasts = podcastService.findTopRatedPodcasts(pageable);
        return new ResponseEntity<>(podcasts, HttpStatus.OK);
    }
}
