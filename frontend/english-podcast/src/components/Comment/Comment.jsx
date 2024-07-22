import React from 'react';

const comments = [
  { id: 1, user: 'John Doe', text: 'Great episode, really enjoyed it!' },
  { id: 2, user: 'Jane Smith', text: 'Very informative and well-presented.' },
  { id: 3, user: 'Alex Johnson', text: 'Looking forward to the next one!' },
];

const Comment = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 p-4 rounded-lg">
            <p className="font-semibold">{comment.user}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
