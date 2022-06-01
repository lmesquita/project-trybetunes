import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <Route exact path="/profile/edit">
        <Header />
        <div data-testid="page-profile-edit">
          <h2>ProfileEdit</h2>
        </div>
      </Route>
    );
  }
}

export default ProfileEdit;
