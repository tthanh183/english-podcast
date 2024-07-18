package com.example.backend.controller;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Podcast;
import com.example.backend.model.User;
import com.example.backend.service.IPodcastService;
import com.example.backend.service.IUserService;
import com.example.backend.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/podcast")
@CrossOrigin("*")
public class PodcastController {
    private final IPodcastService podcastService;
    private final IUserService userService;
    @GetMapping()
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPodcasts() {
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

}
