import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./styles/Seat.css";

export function listarAsientos() {
  return Axios.get("http://localhost:3001/asientos")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error al obtener los asientos:", error);
    });
}

function Seat() {
  const [asientos, setAsientos] = useState([]);

  useEffect(() => {
    const fetchAsientos = async () => {
      const data = await listarAsientos();
      setAsientos(data);
    };

    // Llama a la función inicialmente y luego cada 10 segundos
    fetchAsientos();
    const interval = setInterval(fetchAsientos, 300); // 10 segundos

    return () => {
      clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    };
  }, []);

  const formatoNumero = (number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <div className="table-container left-align">
        <h3>Tabla de Asientos</h3>
        <table>
          <thead>
            <tr>
              <th>Número de Asiento</th>
              <th>Número de Cuenta</th>
              <th>Nombre de Cuenta</th>
              <th>Monto</th>
              <th>Tipo de Movimiento</th>
            </tr>
          </thead>
          <tbody>
            {asientos.map((asiento, index) => {
              return (
                <tr key={index}>
                  <td>{asiento.numeroAsiento}</td>
                  <td>{asiento.numeroCuenta}</td>
                  <td>{asiento.nombreCuenta}</td>
                  <td>{`₡ ${formatoNumero(asiento.monto)} `}</td>
                  <td>{asiento.tipoMovimiento}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Seat;
