package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Episode episode;

    private int stars;

    @Column(name = "create_date")
    private LocalDateTime createdDate;

    public Rating(User user, Episode episode) {
        this.user = user;
        this.episode = episode;
    }
}
