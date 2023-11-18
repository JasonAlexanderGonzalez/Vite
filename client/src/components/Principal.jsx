import React from 'react';
import AgregarCuenta from './AgregarCuenta';
import Seat from './Seat';
import AsientosNM from './AsientosNM';

function Principal () {
  return (
    <div>
      <AgregarCuenta />
      <hr />
      <Seat />
      <AsientosNM/>
    </div>
  );
}

export default Principal;