import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dashboard navigation menu
 * @param {Object} props Passed props
 * @param {string} activeView Active navigation text
 * @param {Function} goToOverview Display function handler
 * @param {Function} goToSettings Display function handler
 * @param {Function} handleLogout Logout function handler
 */
const DashboardMenu = ({ activeView, goToOverview, goToTransactions, handleLogout }) => (
  <div className="accountMenu">
    <h1 className="dashboardHeader">User</h1>
    <ul>
      <li>
        {activeView === 'overview' ? (
          <span className="activeView">Overview</span>
        ) : (
          <button type="button" className="linkButton" onClick={() => goToOverview()}>
            Overview
          </button>
        )}
      </li>
      <li>
        {activeView === 'settings' ? (
          <span className="activeView">Account Settings</span>
        ) : (
          <button type="button" className="linkButton" onClick={() => goToTransactions()}>
            Transactions
          </button>
        )}
      </li>
      <li>
        <button type="button" className="linkButton" onClick={() => handleLogout()}>
          Logout
        </button>
      </li>
    </ul>
  </div>
);

DashboardMenu.propTypes = {
  user: PropTypes.object.isRequired,
  activeView: PropTypes.string.isRequired,
  goToTransactions: PropTypes.func.isRequired,
  goToOverview: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default DashboardMenu;
