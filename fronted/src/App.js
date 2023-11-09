import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    axios.get('/api/user')
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleSignIn = () => {
    window.location.href = '/auth/google';
  };

  const handleSignOut = () => {
    window.location.href = '/logout';
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <img src={user.photos[0].value} alt="Profile Picture" width="100" />
          <p>Hello {user.displayName},</p>
          <a href="#" onClick={handleSignOut}>Sign Out</a>
          <p>You are signed in with email {user.emails[0].value}</p>
        </div>
      ) : (
        <a href="#" onClick={handleSignIn}>Sign In with Gmail</a>
      )}
    </div>
  );
}

export default App;

