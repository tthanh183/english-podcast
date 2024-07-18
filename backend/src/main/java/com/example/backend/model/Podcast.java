package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Podcast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    @Column(name = "date_create")
    private LocalDate createdDate;
    @Column(name = "date_update")
    private LocalDate updatedDate;
    private String image;
    private int star;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "podcast_genre",
            joinColumns = @JoinColumn(name = "podcast_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "id")
    )
    private List<Genre> genres;

    @OneToMany(mappedBy = "podcast", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Episode> episodes;

    @OneToMany(mappedBy = "podcast", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Subscription> subscriptions;

    @OneToMany(mappedBy = "podcast", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FavoritePodcast> favoritePodcasts;
}
