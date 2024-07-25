import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEpisodeById } from "../../services/episode/EpisodeService";
import Header from "../../components/Layout/Header";
import AudioPlay from "../../components/Audio/AudioPlay";
import { Button } from "@material-tailwind/react";
import { PiPlaylistLight } from "react-icons/pi";
import RatingBar from "../../components/Rating/RatingBar";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";
import { addComment, getAllComments } from "../../services/comment/CommentService";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import CommentList from "../../components/Comment/CommentList";

const Sound = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (episodeId) {
      const fetchEpisode = async () => {
        try {
          const response = await getEpisodeById(episodeId);
          console.log("Fetched episode:", response);
          setEpisode(response);
        } catch (error) {
          console.error("Error fetching episode:", error);
        }
      };
      fetchEpisode();
  
      const fetchComments = async () => {
        try {
          const response = await getAllComments(episodeId);
          console.log("Fetched comments:", response);
          setComments(response.data); 
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
      fetchComments();
  
      const socket = new SockJS('http://localhost:8080/ws');
      const client = Stomp.over(socket);
      setStompClient(client);
  
      client.connect({}, () => {
        setConnected(true);
        client.subscribe('/topic/comments', (message) => {
          const newComment = JSON.parse(message.body);
          console.log("Received new comment:", newComment);
          if (newComment.episodeId === episodeId) {
            setComments(prevComments => [newComment, ...prevComments]);
          }
        });
      }, error => {
        console.error("WebSocket connection error:", error);
        setConnected(false);
      });
  
      return () => {
        if (client && connected) {
          client.disconnect();
        }
      };
    }
  }, [episodeId]);

  const handleComment = async () => {
    if (newComment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    const commentData = { content: newComment, episodeId: episodeId, dateTime: new Date() };
    try {
      const response = await addComment(commentData);
      setComments(prevComments => [response, ...prevComments]);
      setNewComment("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment");
    }
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.info("You must log in to add to playlist");
    }
  };

  if (!episode) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!connected) {
    return <p className="text-center text-white">Connecting...</p>;
  }

  return (
    <div>
      <Header />
      <AudioPlay episode={episode} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <Button className="flex items-center gap-3" onClick={handleClick}>
              <PiPlaylistLight />
              Add to Playlist
            </Button>
          </div>
          <RatingBar episodeId={episodeId} />
        </div>
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 mb-2 text-black"
          />
          <Button onClick={handleComment} className="bg-blue-500 text-white">
            Submit
          </Button>
        </div>
        {comments.length > 0 ? (
          <CommentList comments={comments}/>
        ) : (
          <p className="text-white">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Sound;
