import React from 'react';
import logo from './logo.svg';
import './styles/main.css';
import API, { alertErrorHandler } from './services/API';
// components
import LoginForm from './components/LoginForm';

class NousApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      databaseId: '5bbbc5072e22d711eed8ee52',
    };
  }

  handleLogin = credentials => {
    // Make axios call to server to authenticate.
    console.log(credentials);
    API.post('login/', {
      username: credentials.username,
      password: credentials.password,
    },
    {
      headers: {
        'X-Appery-Database-Id': this.state.databaseId,
      }
    })
      .then(response => {
        console.log(response);

        // // set user and authentication in state.
        // this.props.handleLogin(response.data.user);
        // // redirect User to their dashboard / home page.
        // this.props.history.push('/dashboard');
      })
      .catch(err => alertErrorHandler(err));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Lets get that data!
          </p>
        </header>
        <LoginForm handleLogin={this.handleLogin}/>
        <button type="button" className="firstButton" >
            click here!
          </button>

      </div>
    );
  }
}


export default NousApp;
