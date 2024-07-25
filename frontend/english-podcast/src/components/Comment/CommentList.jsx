import React from 'react';

const CommentList = ({ comments, newComment, setNewComment, handleComment }) => {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className="mb-4 p-4 bg-green-800 rounded">
          <div className='flex justify-between'>
            <span className='text-red-300'>{comment.name}</span>
            <span>{comment.dateTime.split('T')[0]}</span>
          </div>
          <p className="text-white">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
