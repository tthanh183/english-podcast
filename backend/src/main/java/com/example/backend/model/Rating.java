package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(RatingId.class)
public class Rating {
    @Id
    private Long userId;
    @Id
    private Long podcastId;
    private int rates;
    @Column(name = "create_date")
    private LocalDate createdDate;
}
