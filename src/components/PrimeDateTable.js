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

    this.state = {};
    this.export = this.export.bind(this);
  }

  export() {
    this.dt.exportCSV();
  }

  render() {
    const { products } = this.props;
    // Export To CSV
    var header = <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}></Button></div>;

    return (
      <DataTable value={products} paginator={true} rows={10} rowsPerPageOptions={[5,10,20]} header={header} ref={(el) => { this.dt = el; }}>
          <Column field="name" header="Name" filter={true} sortable={true} />
          <Column field="serviceCode" header="Service Code" filter={true} sortable={true} />
          <Column field="serviceBy" header="Serviced By" filter={true} sortable={true} />
          <Column field="id" header="Resident ID" filter={true} sortable={true} />
          <Column field="room" header="Room #" filter={true} sortable={true} />
          <Column field="date" header="Date" filter={true} sortable={true}/>
      </DataTable>
    );
  }
}

PrimeDataTable.propTypes = {
  products: PropTypes.func.isRequired,
};

export default PrimeDataTable;