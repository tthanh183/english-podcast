package com.example.backend.service.impl;

import com.example.backend.model.Comment;
import com.example.backend.repository.ICommentRepository;
import com.example.backend.service.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private final ICommentRepository commentRepository;
    @Override
    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> findByEpisodeId(Long episodeId) {
        return commentRepository.findByEpisodeId(episodeId);
    }
}
