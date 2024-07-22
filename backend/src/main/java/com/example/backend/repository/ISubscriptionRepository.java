package com.example.backend.repository;

import com.example.backend.model.Podcast;
import com.example.backend.model.Subscription;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ISubscriptionRepository extends JpaRepository<Subscription, Long> {
    Subscription findByUserAndPodcast(User user, Podcast podcast);
    @Query(value = "select p.* from podcast p inner join subscription s on p.podcast_id = s.podcast_id" +
            "inner join user u on u.user_id = s.user_id order by s.date DESC " +
            "where u.user_id = :userId LIMIT :limit", nativeQuery = true)
    List<Podcast> findTopRecentSubscribedPodcasts(@Param("userId") Long id, @Param("limit") int limit);

    List<Subscription> findAllByUser(User user);

    boolean existsSubscriptionsByUserAndPodcast(User user, Podcast podcast);

//    @Query(value = "count(*) from subscription s where podcast_id = :podcastsId group by(podcast_id )", nativeQuery = true)
}
