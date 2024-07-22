package com.example.backend.controller;

import com.example.backend.exception.ResourceNotFoundException;

import com.example.backend.model.Episode;
import com.example.backend.model.Podcast;
import com.example.backend.service.IEpisodeService;
import com.example.backend.service.IPodcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/podcasts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PodcastController {
    private final IPodcastService podcastService;
    private final IEpisodeService episodeService;

    @GetMapping()
    public ResponseEntity<?> findAllPodcasts() {
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

    @GetMapping("/{podcastId}/episodes")
    public ResponseEntity<?> findAllEpisodes(@PathVariable Long podcastId, @RequestParam int page, @RequestParam int size, @RequestParam String search) {
        try {
            Podcast podcast = podcastService.findPodcastById(podcastId);
            Pageable pageable = PageRequest.of(page, size);
            Page<Episode> episodes = episodeService.findEpisodeByPodcastAndTitleContainingOrderByCreatedDateDesc(podcast, search, pageable);
            return new ResponseEntity<>(episodes, HttpStatus.OK);
        }catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/{podcastId}/episodes")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createEpisode(@PathVariable Long podcastId, @RequestBody Episode episode) {
        try {
            Podcast podcast = podcastService.findPodcastById(podcastId);
            episode.setPodcast(podcast);
            Episode savedEpisode = episodeService.saveEpisode(episode);
            return new ResponseEntity<>(savedEpisode, HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error when creating episode", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{podcastId}/episodes/{episodeId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateEpisode(@PathVariable Long podcastId, @PathVariable Long episodeId, @RequestBody Episode episode) {
        try {
            Episode existingEpisode = episodeService.findEpisodeById(episodeId);
            existingEpisode.setTitle(episode.getTitle());
            existingEpisode.setDescription(episode.getDescription());
            existingEpisode.setDuration(episode.getDuration());
            existingEpisode.setScript(episode.getScript());
            existingEpisode.setUrl(episode.getUrl());
            existingEpisode.setImage(episode.getImage());
            existingEpisode.setUpdatedDate(episode.getUpdatedDate());
            Episode updatedEpisode = episodeService.saveEpisode(existingEpisode);
            return new ResponseEntity<>(updatedEpisode, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error when updating episode", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{podcastId}/episodes/{episodeId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteEpisode(@PathVariable Long podcastId, @PathVariable Long episodeId) {
        try {
            Episode episode = episodeService.findEpisodeById(episodeId);
            episodeService.deleteEpisode(episode);
            return new ResponseEntity<>("Delete episode successfully", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
