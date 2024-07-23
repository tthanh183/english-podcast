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
@RequestMapping("/api/episodes")
@RequiredArgsConstructor
public class EpisodeController {
    private final IEpisodeService episodeService;
    private final IPodcastService podcastService;

    @GetMapping("{id}")
    public ResponseEntity<?> getEpisodeById(@PathVariable Long id) {
        try {
            Episode episode = episodeService.findEpisodeById(id);
            return new ResponseEntity<>(episode, HttpStatus.OK);
        }catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
