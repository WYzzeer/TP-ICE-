import React from 'react';
import './Post.css';

const Post = ({ post, handleSendComment, handleCommentContentChange, handleSendReward, handleRewardAmountChange, rewardAmount }) => (
  <div className="post-container">
    <div className="post-header">
    <div className='creator-infos'>Creator: {post.creator}</div>
      <div className="reward-box">
        <input
          type="number"
          className="reward-input"
          value={rewardAmount}
          onChange={handleRewardAmountChange}
          placeholder="Enter reward amount"
        />
        <button className="reward-button" onClick={() => handleSendReward(post.id)}>
          Reward
        </button>
      </div>
    </div>
    <div className="reward-infos">Reward: {post.reward.value} Ether, Received: {post.reward.count} times</div>
    <div className="post-content">{post.content}</div>
    <div>Comments:</div>
    {post.comments && post.comments.map((comment, commentIndex) => (
      <div className="comment" key={commentIndex}>
        <div className='creator-infos'>Comment Creator: {comment.creator}</div> {/* Ajouter cette ligne */}
        {comment.content}
      </div>
    ))}

    <div className="comment-box">
      <textarea
        className="comment-input"
        value={post.newComment}
        onChange={handleCommentContentChange(post.id)}
        placeholder="Tweet your reply"
      />
      <button className="comment-button" onClick={() => handleSendComment(post.id)}>
        Reply
      </button>
    </div>
  </div>
)

export default Post;
