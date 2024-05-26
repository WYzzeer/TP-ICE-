import React, { useState, useEffect } from 'react';
import Post from './Post';
import './App.css';

function App({ contract, sendPost, fetchPosts, fetchComments, sendComment, rewardPost, getCommentCreator, getPostCreator, getPostReward }) {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTweeting, setIsTweeting] = useState(false);

  const loadPosts = async () => {
    console.log('Fetching data...');
    setIsLoading(true);
    const fetchedPosts = await fetchPosts();
    console.log('Fetched posts:', fetchedPosts);
    const postsWithComments = await Promise.all(fetchedPosts.map(async post => {
      console.log('Fetching comments for post:', post);
      const comments = await fetchComments(post.id);
      console.log('Fetched comments:', comments);

      const [, commentCreators] = await getCommentCreator(post.id);

      const commentsWithCreators = comments.map((comment, index) => {
        console.log('Getting creator for comment:', comment);
        comment.creator = commentCreators[index];
        console.log('Got creator:', comment.creator);
        return comment;
      });

      console.log('Comments with creators:', commentsWithCreators);
      post.comments = commentsWithCreators;
      post.newComment = '';
      console.log('Getting creator for post:', post);
      post.creator = await getPostCreator(post.id);
      console.log('Got creator:', post.creator);
      console.log('Getting reward for post:', post);
      const reward = await getPostReward(post.id);
      let rewardInEtherFixed = parseFloat(reward.totalReward).toFixed(2);
      console.log('Reward in Ether (fixed):', rewardInEtherFixed);
      post.reward = {
        value: rewardInEtherFixed,
        count: Number(reward.count)
      };
      console.log('Got reward:', post.reward);
      
      return post;
    }));
    console.log('Posts with comments:', postsWithComments);
    setPosts(postsWithComments);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, [fetchPosts, fetchComments]);

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  }

  const handleSendPost = async () => {
    setIsTweeting(true);
    const newPostId = await sendPost(postContent);
    setPostId(newPostId);
    setPostContent('');
    setIsTweeting(false);
    loadPosts();
  }

  const handleRewardAmountChange = (event) => {
    setRewardAmount(event.target.value);
  }

  const handleSendReward = async (postId) => {
    await rewardPost(postId, rewardAmount);
    setRewardAmount('');
    loadPosts();
  }

  const handleSendComment = async (postId) => {
    await sendComment(postId, posts.find(post => post.id === postId).newComment);
    setPostId(postId);
    const newPosts = [...posts];
    let post = newPosts.find(post => post.id === postId);
    if(post){
      post.newComment = '';
      setPosts(newPosts);
    }
    loadPosts();
  }

  const handleCommentContentChange = (postId) => (event) => {
    const newPosts = [...posts];
    let post = newPosts.find(post => post.id === postId);
    if(post){
      post.newComment = event.target.value;
      setPosts(newPosts);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      
        <div className="post-box">
          <textarea
            className="post-input"
            value={postContent}
            onChange={handlePostContentChange}
            placeholder="What's happening?"
          />
          <button className="post-button" onClick={handleSendPost} disabled={isTweeting}>
          {isTweeting ? 'Tweeting...' : 'Tweet'} 
        </button>
      </div>

      {isTweeting && <div className="loader">Loading...</div>}

        <hr />

        {posts.map((post, index) => (
        <Post 
          key={index} 
          post={post} 
          handleSendComment={handleSendComment} 
          handleCommentContentChange={handleCommentContentChange}
          handleSendReward={handleSendReward}
          handleRewardAmountChange={handleRewardAmountChange}
          rewardAmount={rewardAmount}
        />
        ))}
        
      </header>
    </div>
  );
}

export default App;
