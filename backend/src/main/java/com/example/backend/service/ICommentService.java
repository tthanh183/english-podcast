package com.example.backend.service;

import com.example.backend.model.Comment;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICommentService {
    Comment save(Comment comment);

    List<Comment> findByEpisodeId(Long episodeId);
}
