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
    // TODO: Add Login and Security
    await this.setState({ 
      loading: true,
      loggedIn: true,
      showTable: true,
    });  

    if (this.state.loggedIn) {
      // Transaction Get Request
      await API.get('api/transactions')
      .then(response => {
        // Sets current transactions
        this.setState({ 
          transactions: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));
  
      // Resident Get Request
      await API.get('api/residents')
      .then(response => {
        // Sets residents
        this.setState({ 
          residents: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));

      // Users Get Request
      await API.get('api/users')
      .then(response => {
        // Sets users
        this.setState({ 
          users: response.data,
        });  
      })
      .catch(err => alertErrorHandler(err));
    }    
  };


  handleOldAPICalls = async credentials => {
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
      // Sets session token
      this.setState({ 
        sessionToken: response.data.sessionToken,
        loading: true,
        loggedIn: true,
        showTable: true,
      });  
    })
    .catch(err => alertErrorHandler(err));

    if (this.state.loggedIn) {
      // Transaction Get Request
      await API.get('collections/Transaction', {
          params: {
            'limit': 1500,
            'sort': '-TransDate',
          },
          headers: {
            'X-Appery-Database-Id': this.state.databaseId,
            'X-Appery-Session-Token': this.state.sessionToken,
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
      await API.get('collections/Resident', {
        headers: {
          'X-Appery-Database-Id': this.state.databaseId,
          'X-Appery-Session-Token': this.state.sessionToken,
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
      await API.get('users', {
        headers: {
          'X-Appery-Database-Id': this.state.databaseId,
          'X-Appery-Session-Token': this.state.sessionToken,
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
      var indexOfResName = this.state.residents.findIndex(i => i.ResidentId === trans.ResidentId);
      var indexOfUserName = this.state.users.findIndex(i => i.username === trans.ServicedBy);
      if(indexOfResName >= 0) {
        residentName = this.state.residents[indexOfResName].SortName;
        residentRoom = this.state.residents[indexOfResName].Room;
      }
      if(indexOfUserName >= 0) {
        userName = this.state.users[indexOfUserName].SortName || trans.ServicedBy;
      }
      dataTemp.push( {
        'name': residentName,
        'serviceCode': trans.ServiceCode,
        'serviceBy': userName || trans.ServicedBy,
        'id': trans.ResidentId,
        'room': residentRoom,
        'date': trans.TransDate,
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
  }

  handleRefresh = async() => {
    this.setState({ 
      loading: true,
    });  
    if (this.state.loggedIn) {
      // Transaction Get Request
      await API.get('collections/Transaction', {
          params: {
            'limit': 1500,
            'sort': '-TransDate',
          },
          headers: {
            'X-Appery-Database-Id': this.state.databaseId,
            'X-Appery-Session-Token': this.state.sessionToken,
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
