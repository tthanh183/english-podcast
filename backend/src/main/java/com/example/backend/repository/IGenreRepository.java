package com.example.backend.repository;

import com.example.backend.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IGenreRepository extends JpaRepository<Genre,Long> {
}
