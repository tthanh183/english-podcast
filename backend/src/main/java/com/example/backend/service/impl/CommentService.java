package com.example.backend.service.impl;

import com.example.backend.dto.CommentResponse;
import com.example.backend.model.Comment;
import com.example.backend.model.User;
import com.example.backend.repository.ICommentRepository;
import com.example.backend.service.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private final ICommentRepository commentRepository;
    private final UserService userService;

    @Override
    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<CommentResponse> findByEpisodeId(Long episodeId) {
        List<Comment> comments = commentRepository.findByEpisodeIdOrderByDateTimeDesc(episodeId);
        return comments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private CommentResponse convertToDto(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setContent(comment.getContent());
        response.setDateTime(comment.getDateTime());
        User user  = userService.findUserById(comment.getUser().getId()).get();
        response.setName(user.getName());
        return response;
    }
}
