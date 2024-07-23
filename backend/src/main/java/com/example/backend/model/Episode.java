package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    @Column(name = "date_create")
    private LocalDateTime createdDate;
    @Column(name = "date_update")
    private LocalDateTime updatedDate;
    private String url;
    private String script;
    private int duration;
    private String image;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "podcast_id")
    private Podcast podcast;

    @JsonIgnore
    @ManyToMany(mappedBy = "episodes", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Playlist> playlists;

    @OneToMany(mappedBy = "episode", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "episode", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Rating> ratings;

    @OneToMany(mappedBy = "episode", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FavoriteEpisode> favoriteEpisodes;

    @OneToMany(mappedBy = "episode", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<History> histories;
}
