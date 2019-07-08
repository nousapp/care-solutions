import React from 'react';
import PropTypes from 'prop-types';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
// Styles
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class PrimeDataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { products } = this.props;

    return (
      <DataTable value={products}>
          <Column field="name" header="Name" />
          <Column field="serviceCode" header="Service Code" />
          <Column field="serviceBy" header="Serviced By" />
          <Column field="id" header="Resident ID" />
          <Column field="room" header="Room #" />
          <Column field="date" header="Date" sortable={true}/>
      </DataTable>
    );
  }
}

PrimeDataTable.propTypes = {
  products: PropTypes.func.isRequired,
};

export default PrimeDataTable;