import React, { useState, useEffect } from 'react';
import { getRating, addRating } from "../../services/rating/RatingService";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomRating from './CustomRating'; // Make sure to update the path if needed

const RatingBar = ({ episodeId }) => {
  const [rating, setRating] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRating = async () => {
      const response = await getRating(episodeId);
      console.log("Fetched rating:", response);
      if (response >= 0) {
        setRating(response);
      }
    };
    fetchRating();
  }, [episodeId]);

  const handleRating = async (newRating) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to rate an episode.");
      navigate('/login');
      return;
    }

    const response = await addRating(episodeId, newRating);
    if (response) {
      setRating(newRating);
      toast.success("Rating updated successfully!");
    } else {
      toast.error("Failed to update rating. Please try again.");
    }
  };

  return (
    <CustomRating value={rating} onChange={handleRating}/>
  );
};

export default RatingBar;
