import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function ExploreIssues() {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: 'Streetlight not working',
      description: 'The streetlight near the park is out for 2 weeks.',
      category: 'streetlight',
      votes: 5,
      comments: []
    },
    {
      id: 2,
      title: 'Garbage on the road',
      description: 'Overflowing garbage near market area.',
      category: 'garbage',
      votes: 8,
      comments: []
    }
  ]);

  const [comment, setComment] = useState('');

  const handleVote = (id) => {
    setIssues(issues.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i));
  };

  const handleComment = (id) => {
    if (comment.trim() === '') return;
    setIssues(issues.map(i =>
      i.id === id ? { ...i, comments: [...i.comments, comment] } : i
    ));
    setComment('');
  };

  return (
    <div className="explore-page">
      {/* ✅ Fixed Header */}
      <header className="explore-header">
        <h2>Explore Issues</h2>
        <div className="explore-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/report">Report Issue</Link>
        </div>
      </header>

      {/* Scrollable content container */}
      <div className="explore-scrollable">
        <div className="explore-container">
          <h2>Explore Reported Issues</h2>
          {issues.map(issue => (
            <div key={issue.id} className="issue-card">
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              <p><b>Category:</b> {issue.category}</p>
              <div className="votes">
                <button onClick={() => handleVote(issue.id)}> Vote ({issue.votes})</button>
              </div>
              <div className="comments">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={() => handleComment(issue.id)}>Post</button>
                {issue.comments.map((c, idx) => (
                  <p key={idx}> {c}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreIssues;
