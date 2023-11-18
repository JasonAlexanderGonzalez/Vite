import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/balanceG.css";


const BalanceGeneral = () => {
  const [cuentasActivas, setCuentasActivas] = useState([]);
  const [cuentasPasivasCapital, setCuentasPasivasCapital] = useState([]);
  const [totalActivas, setTotalActivas] = useState(0);
  const [totalPasivasCapital, setTotalPasivasCapital] = useState(0);
  const [enBalance, setEnBalance] = useState(false);
  //const [mostrarBalance, setMostrarBalance] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/catalogo/cuentasActivos')
      .then(response => {
        setCuentasActivas(response.data);
        const total = response.data.reduce((acc, cuenta) => acc + cuenta.saldo, 0);
        setTotalActivas(total);
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:3001/catalogo/cuentasPasivosCapital')
      .then(response => {
        setCuentasPasivasCapital(response.data);
        const total = response.data.reduce((acc, cuenta) => acc + cuenta.saldo, 0);
        setTotalPasivasCapital(total);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Verificar si las cuentas están en balance
    setEnBalance(totalActivas === totalPasivasCapital);
  }, [totalActivas, totalPasivasCapital]);

  /*
  const toggleMostrarBalance = () => {
    setMostrarBalance(!mostrarBalance);
  };
  */

  const formatoNumero = (number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="botones3">
        <div>
          <h2>Balance General</h2>
          <table>
            <thead>
              <tr>
                <th>Cuentas</th>
                <th>Saldo de cuentas Activas</th>
                <th>Saldo cuentas Pasivas-Capital</th>
              </tr>
            </thead>
            <tbody>
              {cuentasActivas.map(cuenta => (
                <tr key={cuenta.numeroCuenta}>
                  <td>{cuenta.nombreCuenta}</td>
                  <td>{`₡ ${formatoNumero(cuenta.saldo)}`}</td>
                  <td></td>
                </tr>
              ))}
              {cuentasPasivasCapital.map(cuenta => (
                <tr key={cuenta.numeroCuenta}>
                  <td>{cuenta.nombreCuenta}</td>
                  <td></td>
                  <td>{`₡ ${formatoNumero(cuenta.saldo)}`}</td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>{`₡ ${formatoNumero(totalActivas)}`}</td>
                <td>{`₡ ${formatoNumero(totalPasivasCapital)}`}</td>
              </tr>
            </tbody>
          </table>
          <div className="b2">
            {enBalance ? (
              <p>Cuentas correctamente en balance</p>
            ) : (
              <p>Cuentas no están en balance</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default BalanceGeneral;
