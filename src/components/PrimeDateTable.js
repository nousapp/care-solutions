import React from 'react';
import PropTypes from 'prop-types';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
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
    let paginatorLeft = <Button icon="pi pi-refresh"/>;
    let paginatorRight = <Button icon="pi pi-cloud-upload"/>;

    return (
      <DataTable value={products} paginator={true} paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rows={10} rowsPerPageOptions={[5,10,20]}>
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