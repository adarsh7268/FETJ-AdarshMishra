import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/user')
      .then(response => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    } else if (user) {
      return (
        <div>
          <img src={user.photos[0].value} alt="Profile Picture" />
          <p>Hello {user.displayName},</p>
          <p>You are signed in with email {user.emails[0].value}</p>
          <p>{user.time}</p>
          <a href="/logout">Sign Out</a>
        </div>
      );
    } else {
      return <a href="/auth/google">Sign In with Gmail</a>;
    }
  };

  return (
    <div className="container">
      <h1>Gmail Authentication Example</h1>
      <div id="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
