package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int view;
    @Column(name = "current_time")
    private int currentTime;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "episode_id")
    private Episode episode;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
