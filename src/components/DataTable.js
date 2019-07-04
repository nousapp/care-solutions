import React from 'react';
import PropTypes from 'prop-types';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../styles/DataTable.css';
import BootstrapTable from 'react-bootstrap-table-next';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [{
          dataField: 'name',
          text: 'Resident Name',
        }, {
          dataField: 'serviceCode',
          text: 'Service Code',
        }, {
          dataField: 'serviceBy',
          text: 'Serviced By',
        }, {
          dataField: 'id',
          text: 'Resident ID',
        }, {
          dataField: 'room',
          text: 'Room #',
        }, {
          dataField: 'date',
          text: 'Date',
        },
      ],
    };
  }

  render() {
    const { products } = this.props;

    return (
      <div className="DataTable1">
        <BootstrapTable keyField='id' className="DataTable" data={ products } columns={ this.state.columns } />
      </div>
    );
  }
}

DataTable.propTypes = {
  products: PropTypes.func.isRequired,
};

export default DataTable;