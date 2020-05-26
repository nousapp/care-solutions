import React from 'react';
import logo from './pics/CrownTransparent.png';
import './styles/main.css';
import API, { alertErrorHandler } from './services/API';
// components
import LoginForm from './components/LoginForm';
// import DataTable from './components/DataTable';
import PrimeDataTable from './components/PrimeDataTable';

class NousApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      databaseId: '5bbbc5072e22d711eed8ee52',
      sessionToken: '',
      loading: false,
      loggedIn: false,
      showTable: false,
      residents: [],
      transactions: [],
      users: [],
      tableData: [],
    };
  }

  handleAPICalls = async credentials => {
    // Login Request
    await API.post('api/users/login', {
        username: credentials.username,
        password: credentials.password,
      }
    )
    .then(response => {
      // Sets session token
      this.setState({ 
        sessionToken: response.data,
        loading: true,
        loggedIn: true,
        showTable: true,
      });  
    })
    .catch(err => alertErrorHandler(err));

    if (this.state.loggedIn) {
      // Transaction Get Request
      await API.get('api/transactions', {
          headers: {
            'x-access-token': this.state.sessionToken,
          }
      })
      .then(response => {
        // Sets current transactions
        this.setState({ 
          transactions: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));
  
      // Resident Get Request
      await API.get('api/residents', {
        headers: {
          'x-access-token': this.state.sessionToken,
        }
      })
      .then(response => {
        // Sets residents
        this.setState({ 
          residents: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));

      // Users Get Request
      await API.get('api/users', {
        headers: {
          'x-access-token': this.state.sessionToken,
        }
      })
      .then(response => {
        // Sets users
        this.setState({ 
          users: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));
    }    
  };

  handlePopulateData = async() => {
    const dataTemp = []
    await this.state.transactions.forEach(trans => {
      var residentName = '';
      var residentRoom = '';
      var userName = '';
      var indexOfResName = this.state.residents.findIndex(i => i.id == trans.resident_id);
      var indexOfUserName = this.state.users.findIndex(i => i.username == trans.username);
      if(indexOfResName >= 0) {
        residentName = this.state.residents[indexOfResName].sortname;
        residentRoom = this.state.residents[indexOfResName].room;
      }
      if(indexOfUserName >= 0) {
        userName = this.state.users[indexOfUserName].sortname || trans.username;
      }
      dataTemp.push( {
        'name': residentName,
        'serviceCode': trans.service_code,
        'serviceBy': userName || trans.username,
        'id': trans.resident_id,
        'room': residentRoom,
        'date': trans.trans_date,
      });
    });
    this.setState({ 
      tableData: dataTemp,
      loading: false,
    });  
  }

  handleLogin = async(credentials) => {
    await this.handleAPICalls(credentials);
    this.handlePopulateData();
    console.log(this.state.tableData);
  }

  handleRefresh = async() => {
    this.setState({ 
      loading: true,
    });  
    if (this.state.loggedIn) {
      // Transaction Get Request
      await API.get('api/transactions', {
          headers: {
            'x-access-token': this.state.sessionToken,
          }
      })
      .then(response => {
        // Sets current transactions
        this.setState({ 
          transactions: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));
    }   
    this.handlePopulateData();
  }

  render() {
    return (
      <div className="App">
        <header className="appHeader">
          <img src={logo} className="appLogo" alt="logo" />
          <p className="subHeader">Royal Bellingham's</p>
          <p className="headerTitle">Care Solutions</p>
        </header>
        {this.state.loggedIn ? null : (
          <LoginForm handleLogin={this.handleLogin}/>
        )}
        {this.state.showTable ? (
          <div>
            <p className="tableHeader">Transactions</p>
            <div className="tableBorder">
              <PrimeDataTable loading={this.state.loading} products={this.state.tableData} onRefresh={this.handleRefresh} />
            </div>
          </div>
        ) : null}

      </div>
    );
  }
}


export default NousApp;
