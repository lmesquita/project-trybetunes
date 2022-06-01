import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      loginDisable: true,
      isLoading: false,
      redirect: false,
    };
  }

  validateButton = () => {
    const minLengthName = 3;
    const { nameInput } = this.state;
    this.setState({
      loginDisable: (nameInput.length < minLengthName),
    });
  };

  saveUser = async () => {
    this.setState({ isLoading: true });
    const { nameInput } = this.state;
    await createUser({ name: nameInput });
    this.setState({ isLoading: false, redirect: true });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  render() {
    const {
      nameInput,
      loginDisable,
      isLoading,
      redirect,
    } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          <input
            type="text"
            name="nameInput"
            value={ nameInput }
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ loginDisable }
            onClick={ this.saveUser }
          >
            Entrar
          </button>
        </form>
        { redirect ? <Redirect to="/search" /> : '' }
      </div>
    );
  }
}

export default Login;
