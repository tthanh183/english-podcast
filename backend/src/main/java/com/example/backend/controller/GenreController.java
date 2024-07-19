package com.example.backend.controller;

import com.example.backend.model.Genre;
import com.example.backend.service.IGenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
@CrossOrigin("*")
public class GenreController {
    private final IGenreService genreService;
    @GetMapping
    public ResponseEntity<List<Genre>> getAllGenres() {
        return ResponseEntity.ok(genreService.getAllGenres());
    }
}
