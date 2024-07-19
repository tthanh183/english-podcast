package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Genre;
import com.example.backend.repository.IGenreRepository;
import com.example.backend.service.IGenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService implements IGenreService {
    private final IGenreRepository genreRepository;

    @Override
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    @Override
    public Genre findById(Long id) {
        return genreRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Genre not found"));
    }
}
