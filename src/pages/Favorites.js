import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <Route path="/favorites">
        <Header />
        <div data-testid="page-favorites">
          <h2>Favorites</h2>
        </div>
      </Route>
    );
  }
}

export default Favorites;
