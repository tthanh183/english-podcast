import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { IconButton } from "@material-tailwind/react";
import { useAuth } from "../../contexts/AuthProvider";
import { getNotifications, markAllAsRead } from "../../services/notification/NotificationService";
import { getUser } from '../../services/user/UserService';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const { user } = useAuth(); 
  const [userId, setUserId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        try {
          const response = await getUser();
          setUserId(response.id); 
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();

      const fetchNotifications = async () => {
        try {
          const response = await getNotifications();
          setNotifications(response);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
      fetchNotifications();

      const socket = new SockJS('http://localhost:8080/ws');
      const client = Stomp.over(socket);
      setStompClient(client);

      client.connect({}, () => {
        setConnected(true);
        setConnectionStatus('Connected');
        console.log('WebSocket connected');
        if (userId) {
          client.subscribe(`/topic/notifications/${userId}`, (message) => {
            const newNotification = JSON.parse(message.body);
            console.log("Received new notification:", newNotification);
            setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
          });
        }
      }, error => {
        console.error("WebSocket connection error:", error);
        setConnected(false);
        setConnectionStatus('Connection failed');
      });

      return () => {
        if (client && connected) {
          client.disconnect();
          console.log('WebSocket disconnected');
        }
      };
    }
  }, [user]);

  const handleToggleNotifications = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      try {
        await markAllAsRead();
        setNotifications(prevNotifications => prevNotifications.map(n => ({ ...n, read: true })));
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    } else {
      setNotifications(prevNotifications => prevNotifications.filter(n => !n.read));
    }
  };

  return (
    <div className="relative">
      <IconButton variant="text" onClick={handleToggleNotifications} className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green"
          className="h-8 w-8"
        >
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clipRule="evenodd"
          />
        </svg>
        {notifications.some(notification => !notification.read) && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-3 w-3 p-1 text-white bg-red-600 rounded-full"></span>
        )}
      </IconButton>
      {connected ? (
        showNotifications ? (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
            <div className="py-2">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-2 text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'} border-b cursor-pointer`}
                  >
                    {notification.message}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-green-500 h-8">
                  <p>No notifications</p>
                </div>
              )}
            </div>
          </div>
        ) : null
      ) : (
        <p className="text-center text-white">{connectionStatus}</p>
      )}
    </div>
  );
};

export default Notification;
