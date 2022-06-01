import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = ({
      user: '',
    });
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    const recept = await getUser();
    this.setState({ user: recept.name });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{ user || <Loading /> }</span>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
