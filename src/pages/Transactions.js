import React from 'react';
import PropTypes from 'prop-types'; 
import PrimeDataTable from '../components/PrimeDataTable';

class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'overview',
    };
  }


  render() {
    const {
      loading,
      tableData,
      handleRefresh,
    } = this.props;


    return (
      <main className="transactions">
        <p className="tableHeader">Transactions</p>
        <div className="tableBorder">
            <PrimeDataTable loading={loading} products={tableData} onRefresh={handleRefresh} />
        </div>
      </main>
    );
  }
}

Transactions.propTypes = {
    loading: PropTypes.bool,
    tableData: PropTypes.array,
    handleRefresh: PropTypes.func,   
}

export default Transactions;
