import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Catalogo.css";
import "./styles/balanceG.css";


const PerdidasGanancias = () => {
  const [cuentasGastos, setCuentasGastos] = useState([]);
  const [cuentasIngresos, setCuentasIngresos] = useState([]);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);
  //const [mostrarPerdidasGanancias, setMostrarPerdidasGanancias] =
 //   useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/catalogo/cuentasGastos")
      .then((response) => {
        setCuentasGastos(response.data);
        const total = response.data.reduce(
          (acc, cuenta) => acc + cuenta.saldo,
          0
        );
        setTotalGastos(total);
      })
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:3001/catalogo/cuentasIngresos")
      .then((response) => {
        setCuentasIngresos(response.data);
        const total = response.data.reduce(
          (acc, cuenta) => acc + cuenta.saldo,
          0
        );
        setTotalIngresos(total);
      })
      .catch((error) => console.error(error));
  }, []);

  const resultado = totalGastos > totalIngresos
  ? totalGastos - totalIngresos
  : totalIngresos - totalGastos;

  console.log(resultado);
  
  console.log(resultado);

  /*
  const toggleMostrarPerdidasGanancias = () => {
    setMostrarPerdidasGanancias(!mostrarPerdidasGanancias);
  };
  */

  const actualizarPerdidasGanancias = async () => {
    try {
      // Realiza una solicitud al servidor para actualizar el saldo en la base de datos
      const response = await axios.put("http://localhost:3001/catalogo/actualizarPerdidasGanancias", {
        resultado: resultado,
      });

      // Maneja la respuesta del servidor, por ejemplo, muestra un mensaje al usuario
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      // Maneja cualquier error que pueda ocurrir durante la solicitud al servidor
    }
  };

  const formatoNumero = (number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="botones2">
        <div>
          <h2>Estado de Pérdidas y Ganancias</h2>
          <table>
            <thead>
              <tr>
                <th>Cuenta</th>
                <th>Saldo Gasto</th>
                <th>Saldo Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {cuentasGastos.map((cuenta) => (
                <tr key={cuenta.numeroCuenta}>
                  <td>{cuenta.nombreCuenta}</td>
                  <td>{`₡ ${formatoNumero(cuenta.saldo)}`}</td>
                  <td></td>
                </tr>
              ))}
              {cuentasIngresos.map((cuenta) => (
                <tr key={cuenta.numeroCuenta}>
                  <td>{cuenta.nombreCuenta}</td>
                  <td></td>
                  <td>{`₡ ${formatoNumero(cuenta.saldo)}`}</td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>{`₡ ${formatoNumero(totalGastos)}`}</td>
                <td>{`₡ ${formatoNumero(totalIngresos)}`}</td>
              </tr>
              <tr>
                <td>Resultado</td>
                <td>{totalGastos > totalIngresos ? `₡ ${formatoNumero(resultado)}` : ""}</td>
                <td>{totalIngresos > totalGastos ? `₡ ${formatoNumero(resultado)}` : ""}</td>
              </tr>
            </tbody>
          </table>

          <div className="b1">
            {totalGastos > totalIngresos ? <p>Se presentan Pérdidas</p> : <p>Se presentan Ganancias</p>} 
          </div>

          <button onClick={actualizarPerdidasGanancias}>
            Actualizar las Pérdidas y Ganancias
          </button >
        </div>
    </div>
  );
};

export default PerdidasGanancias;
