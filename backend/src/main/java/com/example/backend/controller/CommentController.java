package com.example.backend.controller;

import com.example.backend.dto.CommentRequest;
import com.example.backend.dto.CommentResponse;
import com.example.backend.model.Comment;
import com.example.backend.model.Episode;
import com.example.backend.model.User;
import com.example.backend.repository.ICommentRepository;
import com.example.backend.service.ICommentService;
import com.example.backend.service.IEpisodeService;
import com.example.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CommentController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ICommentService commentService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IEpisodeService episodeService;

    @PostMapping("/api/comments")
    public ResponseEntity<Comment> addComment(@RequestBody CommentRequest commentRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        User user = userService.findUserByEmail(email);

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setContent(commentRequest.getContent());
        comment.setDateTime(commentRequest.getDateTime());

        Episode episode = episodeService.findEpisodeById(commentRequest.getEpisodeId());
        comment.setEpisode(episode);

        Comment savedComment = commentService.save(comment);
        messagingTemplate.convertAndSend("/topic/comments", savedComment);
        return ResponseEntity.ok(savedComment);
    }

    @GetMapping("/api/comments")
    public ResponseEntity<?> getAllComments(@RequestParam Long episodeId) {
        List<CommentResponse> comments = commentService.findByEpisodeId(episodeId);
        return ResponseEntity.ok(comments);
    }
}
