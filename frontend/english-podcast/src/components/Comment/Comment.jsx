import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import CommentList from './CommentList'
import CommentForm from './CommentForm';
const PodcastPage = () => {
  const [comments, setComments] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Fetch initial comments
    axios.get('/api/comments?podcastId=1').then(response => setComments(response.data));

    // WebSocket setup
    const socket = new SockJS('/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/comments', (message) => {
        const newComment = JSON.parse(message.body);
        setComments(prevComments => [...prevComments, newComment]);
      });
    });
    setStompClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const handleComment = (content) => {
    axios.post('/api/comments', { content, podcastId: 1 }).then(response => {
      setComments(prevComments => [...prevComments, response.data]);
    });
  };

  return (
    <div>
      <CommentList comments={comments} />
      <CommentForm onComment={handleComment} />
    </div>
  );
};

export default PodcastPage;
