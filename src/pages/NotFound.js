import React from 'react';
import { Route } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <Route path="*">
        <div data-testid="page-not-found">
          <h2>NotFound</h2>
        </div>
      </Route>
    );
  }
}

export default NotFound;
