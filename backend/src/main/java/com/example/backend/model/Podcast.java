package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private LocalDateTime createdDate;
    @Column(name = "date_update")
    private LocalDateTime updatedDate;
    private String image;
    @Column(name = "avg_rating", columnDefinition = "default 0")
    private double avgRating;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "podcast_genre",
            joinColumns = @JoinColumn(name = "podcast_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "id")
    )
    private List<Genre> genres;

    @OneToMany(mappedBy = "podcast", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Episode> episodes;

    @ToString.Exclude
    @OneToMany(mappedBy = "podcast", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Subscription> subscriptions = new HashSet<>();

    @OneToMany(mappedBy = "podcast", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FavoritePodcast> favoritePodcasts;

    @OneToMany(mappedBy = "podcast", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @Override
    public String toString() {
        return "Podcast{id=" + id + ", title='" + title + "', description='" + description + "', image='" + image + "'}";
    }
}
