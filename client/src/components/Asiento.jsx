import React, { useState, useEffect } from "react";
import Asientos from "./Asientos";
import "./styles/AsientosStyle.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faX } from "@fortawesome/free-solid-svg-icons";

function Asiento({
  numeroAsiento,
  asientos,
  handleNombreCuentaChange,
  handleNumeroCuentaChange,
}) {
  const [montos, setMontos] = useState({});
  const [tiposMovimiento, setTiposMovimiento] = useState({});
  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);

  useEffect(() => {
    // Calcular el total del Debe
    const debeTotal = Object.keys(montos).reduce((acc, numeroCuenta) => {
      if (
        tiposMovimiento[numeroCuenta] === "D" &&
        montos[numeroCuenta] !== ""
      ) {
        const montoFloat = parseFloat(
          montos[numeroCuenta].replace(/[,.]/g, "").replace(",", ".")
        );
        return acc + montoFloat;
      }
      return acc;
    }, 0);

    // Calcular el total del Haber
    const haberTotal = Object.keys(montos).reduce((acc, numeroCuenta) => {
      if (
        tiposMovimiento[numeroCuenta] === "H" &&
        montos[numeroCuenta] !== ""
      ) {
        const montoFloat = parseFloat(
          montos[numeroCuenta].replace(/[,.]/g, "").replace(",", ".")
        );
        return acc + montoFloat;
      }
      return acc;
    }, 0);

    setTotalDebe(debeTotal);
    setTotalHaber(haberTotal);
  }, [montos, tiposMovimiento]);

  const handleMontoChange = (numeroCuenta, valor) => {
    setMontos({
      ...montos,
      [numeroCuenta]: valor,
    });
  };

  const handleTipoMovimientoChange = (numeroCuenta, tipo) => {
    setTiposMovimiento({
      ...tiposMovimiento,
      [numeroCuenta]: tipo,
    });
  };

  const registroHabilitado = totalDebe === totalHaber;

  

  return (
    <div className="asiento-container">
      <h3 className="asiento-title">Asiento # {numeroAsiento}</h3>
      {asientos.map((asiento) => (
        <Asientos
          key={asiento.numeroCuenta}
          numeroCuenta={asiento.numeroCuenta}
          nombreCuenta={asiento.nombreCuenta}
          numeroAsiento={numeroAsiento}
          handleNombreCuentaChange={handleNombreCuentaChange}
          handleNumeroCuentaChange={handleNumeroCuentaChange}
          monto={montos[asiento.numeroCuenta] || ""}
          tipoMovimiento={tiposMovimiento[asiento.numeroCuenta] || "D"}
          handleMontoChange={(valor) =>
            handleMontoChange(asiento.numeroCuenta, valor)
          }
          handleTipoMovimientoChange={(tipo) =>
            handleTipoMovimientoChange(asiento.numeroCuenta, tipo)
          }
          registroHabilitado={registroHabilitado}
        />
      ))}
      <div>Total Debe: {totalDebe}</div>
      <div>Total Haber: {totalHaber}</div>
    </div>
  );
}

export default Asiento;
