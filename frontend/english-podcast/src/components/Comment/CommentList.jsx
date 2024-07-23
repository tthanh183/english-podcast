import React from 'react';

const CommentList = ({ comments, newComment, setNewComment, handleComment }) => {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className="mb-4 p-4 bg-gray-800 rounded">
          <p className="text-white">{comment.content}</p>
        </div>
      ))}
      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 mb-2 text-black"
        />
        <button onClick={handleComment} className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentList;
