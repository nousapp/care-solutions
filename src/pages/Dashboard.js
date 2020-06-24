import React from 'react';
import PropTypes from 'prop-types'; 
import DashboardMenu from '../components/DashboardMenu';
import '../styles/Dashboard.css';
import { Transactions } from '../pages';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'overview',
    };
  }

  goToOverview = () => {
    this.setState({ active: 'overview' });
  };

  goToTransactions = () => {
    this.setState({ active: 'transactions' });
  };

  render() {
    const {
      user,
      activeDashboard,
      goToOverview,
      goToTransactions,
      loading,
      tableData,
      handleRefresh,
      handleLogout,
      location: { pathname: pathName },
    } = this.props;


    return (
      <main className="dashboard">
        <DashboardMenu
          goToOverview={this.goToOverview}
          goToTransactions={this.goToTransactions}
          handleLogout={handleLogout}
        />
        {this.state.active === 'overview' ? (
        // {activeDashboard === 'overview' ? (
          <div className="dashboardBody">
            <h1 className="dashboardHeader">Welcome, Devon!</h1>
          </div>
        ) : (
          ''
        )}
        {this.state.active === 'transactions' ? (
        // {activeDashboard === 'transactions' ? (
          <div className="dashboardBody">
            <Transactions
              // {...props}
              loading={loading}
              tableData={tableData}
              handleRefresh={this.handleRefresh}
            />
            <h1 className="dashboardHeader">Account Transactions</h1>
          </div>
        ) : (
          ''
        )}
      </main>
    );
  }
}

Dashboard.propTypes = {
    loading: PropTypes.bool,
    tableData: PropTypes.array,
    handleRefresh: PropTypes.func,
    activeDashboard: PropTypes.string,
    goToOverview: PropTypes.func,
    goToTransactions: PropTypes.func,
    loggedIn: PropTypes.bool,
    handleLogout: PropTypes.func,   
}

export default Dashboard;
