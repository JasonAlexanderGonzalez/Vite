import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/balanceG.css";
import "./styles/Seat.css";

const Balance = () => {
  const [cuentasDeben, setCuentasDeben] = useState([]);
  const [cuentasHaber, setCuentasHaber] = useState([]);
  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);
  const [enBalance, setEnBalance] = useState(false);
  //const [mostrarBalance, setMostrarBalance] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/catalogo/cuentasD')
      .then(response => {
        setCuentasDeben(response.data);
        const total = response.data.reduce((acc, cuenta) => acc + cuenta.saldo, 0);
        setTotalDebe(total);
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:3001/catalogo/cuentasH')
      .then(response => {
        setCuentasHaber(response.data);
        const total = response.data.reduce((acc, cuenta) => acc + cuenta.saldo, 0);
        setTotalHaber(total);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Verificar si las cuentas están en balance
    setEnBalance(totalDebe === totalHaber);
  }, [totalDebe, totalHaber]);

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
    <div className="botones">
        <div>
          <h2>Balance de Comprobación</h2>
          <table>
            <thead>
              <tr>
                <th>Cuentas</th>
                <th>Saldo DEBE</th>
                <th>Saldo HABER</th>
              </tr>
            </thead>
            <tbody>
              {cuentasDeben.map(cuenta => (
                <tr key={cuenta.numeroCuenta}>
                  <td>{cuenta.nombreCuenta}</td>
                  <td>{`₡ ${formatoNumero(cuenta.saldo)}`}</td>
                  <td></td>
                </tr>
              ))}
              {cuentasHaber.map(cuenta => (
                <tr key={cuenta.numeroCuenta}>
                  <td>{cuenta.nombreCuenta}</td>
                  <td></td>
                  <td>{`₡ ${formatoNumero(cuenta.saldo)}`}</td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>{`₡ ${formatoNumero(totalDebe)}`}</td>
                <td>{`₡ ${formatoNumero(totalHaber)}`}</td>
              </tr>
            </tbody>
          </table>
          <div className="b">
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

export default Balance;
