import React from 'react';
import logo from './logo.svg';
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
      tableData: [],
    };
  }

  handleAPICalls = async credentials => {
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
            'skip': 750,
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
    }    
  };

  handlePopulateData = async() => {
    const dataTemp = []
    await this.state.transactions.forEach(trans => {
      var residentName = '';
      var residentRoom = '';
      var indexOfName = this.state.residents.findIndex(i => i.ResidentId === trans.ResidentId);
      if(indexOfName >= 0) {
        residentName = this.state.residents[indexOfName].SortName;
        residentRoom = this.state.residents[indexOfName].Room;
      }
      dataTemp.push( {
        'name': residentName,
        'serviceCode': trans.ServiceCode,
        'serviceBy': trans.ServicedBy,
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
          <p>
            Care Solutions
          </p>
        </header>
        {this.state.loggedIn ? null : (
          <LoginForm handleLogin={this.handleLogin}/>
        )}
        {this.state.showTable ? (
          <div>
            <p className="tableHeader">Transactions</p>
            <PrimeDataTable loading={this.state.loading} products={this.state.tableData} onRefresh={this.handleRefresh} />
          </div>
        ) : null}

      </div>
    );
  }
}


export default NousApp;
