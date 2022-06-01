import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <Route exact path="/profile">
        <Header />
        <div data-testid="page-profile">
          <h2>Profile</h2>
        </div>
      </Route>
    );
  }
}

export default Profile;
