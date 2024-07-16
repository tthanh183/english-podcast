package com.example.backend.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class RatingId implements Serializable {
    private int userId;
    private int podcastId;
}
