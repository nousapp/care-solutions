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
      sessionToken: '',
      loggedIn: false,
      residents: [],
      transactions: [],
    };
  }

  handleLogin = async credentials => {
    // Login Request
    await API.post('login/', {
        username: credentials.username,
        password: credentials.password,
      },
      {
        headers: {
          'X-Appery-Database-Id': this.state.databaseId,
        }
    })
    .then(response => {
      console.log('This is Login');
      console.log(response);
      // Sets session token
      this.setState({ 
        sessionToken: response.data.sessionToken,
        loggedIn: true,
      });  
    })
    .catch(err => alertErrorHandler(err));

    if (this.state.loggedIn) {
      // Transaction Get Request
      API.get('collections/Transaction', {
          headers: {
            'X-Appery-Database-Id': this.state.databaseId,
            'X-Appery-Session-Token': this.state.sessionToken,
          }
      })
      .then(response => {
        console.log('This is Transaction');
        console.log(response);
        // Sets current transactions
        this.setState({ 
          transactions: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));
  
      // Resident Get Request
      API.get('collections/Resident', {
        headers: {
          'X-Appery-Database-Id': this.state.databaseId,
          'X-Appery-Session-Token': this.state.sessionToken,
        }
      })
      .then(response => {
        console.log('This is Resident');
        console.log(response);
        // Sets residents
        this.setState({ 
          residents: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));
    }    
  };

  handleGetData = () => {
    console.log(this.state.sessionToken);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Lets get that data!
          </p>
        </header>
        {this.state.loggedIn ? null : (
          <LoginForm handleLogin={this.handleLogin}/>
        )}
        <button type="button" className="firstButton" onClick={this.handleGetData}>
            click here!
          </button>

      </div>
    );
  }
}


export default NousApp;
