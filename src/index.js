import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { ethers } from 'ethers';

const config = require('./config.json');

const contractAddress = config.contractAddress;
const contractABI = config.contractABI;

let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner();
let contract = new ethers.Contract(contractAddress, contractABI, signer);

async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

async function fetchPosts() {
  if (!contract) {
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  }

  const [postIds, postContents] = await contract.getPost();
  let posts = [];
  for (let i = 0; i < postIds.length; i++) {
    posts.push({id: postIds[i], content: postContents[i]});
  }
  return posts;
}

async function fetchComments(postId) {
  if (!contract) {
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  }

  const [commentIds, commentContents] = await contract.getComments(postId);
  let comments = [];
  for (let i = 0; i < commentIds.length; i++) {
    console.log("Voici les commentairs rédupéré " + commentContents)
    comments.push({id: commentIds[i], content: commentContents[i]});
  }
  return comments;
}

async function sendPost(content) {
  try {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    if (!signer) {
      signer = provider.getSigner();
    }

    if (!contract) {
      contract = new ethers.Contract(contractAddress, contractABI, signer);
    }

    const transaction = await contract.SendPost(content);
    await transaction.wait();

    const postIds = await fetchPosts();
    const newPostId = postIds[postIds.length - 1]; // Le dernier post est le nouveau post
    return newPostId;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function rewardPost(postId, amount) {
  try {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    if (!signer) {
      signer = provider.getSigner();
    }

    if (!contract) {
      contract = new ethers.Contract(contractAddress, contractABI, signer);
    }

    const transaction = await contract.reward(postId, {value: ethers.utils.parseEther(amount)});
    await transaction.wait();
    alert('Reward sent!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function sendComment(postId, content) {
  try {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    if (!signer) {
      signer = provider.getSigner();
    }

    if (!contract) {
      contract = new ethers.Contract(contractAddress, contractABI, signer);
    }

    const transaction = await contract.CommentPost(postId, content);
    await transaction.wait();
    alert('Comment sent!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function getPostCreator(postId) {
  if (!contract) {
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  }

  const [postIds, postCreators] = await contract.getPostCreators();
  
  return postCreators[postId]
  
  
  throw new Error("Post not found");
}


async function getCommentCreator(postId, commentId) {
  if (!contract) {
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  }

  const commentCreator = await contract.getCommentCreators(postId);

  return commentCreator;
}

async function getPostReward(postId) {
  if (!contract) {
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  }

  const [totalRewardWei, rewardCount] = await contract.getPostRewards(postId);

  console.log("ICI LE POST REWARD " + totalRewardWei + " " +  rewardCount)
  const totalRewardEther = ethers.utils.formatEther(totalRewardWei);

  console.log("ICI LE POST REWARD Converti " + totalRewardEther + " " +  rewardCount)
  return { totalReward: totalRewardEther, count: rewardCount };
}


window.sendPost = sendPost; // définir sendPost comme une fonction globale

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App 
      sendPost={sendPost}
      fetchPosts={fetchPosts}
      fetchComments={fetchComments}
      sendComment={sendComment}
      rewardPost={rewardPost}
      getPostCreator={getPostCreator}
      getCommentCreator={getCommentCreator}
      getPostReward={getPostReward}
    />
  </React.StrictMode>
);

reportWebVitals();
