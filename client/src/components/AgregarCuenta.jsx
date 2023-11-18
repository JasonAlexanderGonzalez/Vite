import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
//import Asientos from "./Asientos";
import ModalCatalogo from "./ModalCatalogo";
import Asiento from "./Asiento";
import "./styles/AgregarCuenta.css";
//import Seat from "./Seat";


function AgregarCuenta() {
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [nombreCuenta, setNombreCuenta] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [mostrarAsientos, setMostrarAsientos] = useState(false);
  const [numeroAsiento, setNumeroAsiento] = useState(1);
  const [asientosList, setAsientosList] = useState([[]]);

  const handleNumeroCuentaChange = (e) => {
    setNumeroCuenta(e.target.value);
  };

  const handleNombreCuentaChange = (e) => {
    setNombreCuenta(e.target.value);
  };

  const buscarCuenta = async () => {
    if (numeroCuenta === "0" && !disabled) {
      Swal.fire({
        title: "¿Estás seguro de dejar de buscar cuentas?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setDisabled(true);
        }
      });
    } else {
      try {
        // Actualiza nombreCuenta antes de la solicitud Axios
        setNombreCuenta(""); // Esto limpia el valor anterior
        const response = await Axios.get(
          `http://localhost:3001/asientos/${numeroCuenta}`
        );

        if (response.data && response.data.nombreCuenta) {
          const newNombreCuenta = response.data.nombreCuenta;
          setNombreCuenta(newNombreCuenta);
          setNumeroCuenta("");

          // Actualiza la lista de asientos correspondiente al asiento actual
          const updatedAsientosList = [...asientosList];
          updatedAsientosList[numeroAsiento - 1].push({
            numeroCuenta,
            nombreCuenta: newNombreCuenta, // Usa el nuevo nombre de cuenta
          });

          setAsientosList(updatedAsientosList);
          setMostrarAsientos(true);
        } else {
          console.log(response.data, "No encontrado");
        }
      } catch (error) {
        console.error("Error al buscar la cuenta:", error);
        Swal.fire({
          title: "Error al buscar la cuenta",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const habilitar = () => {
    setDisabled(false);
    setNumeroCuenta("");
    setNumeroAsiento(numeroAsiento + 1);

    // Agrega un nuevo asiento vacío a la lista
    setAsientosList([...asientosList, []]);
  };

  return (
    <div className="App">
      <br />
      <div className="text-center">
        <h1 className="text-success">Creación de Asientos</h1>
      </div>
      <input
        type="text"
        placeholder="Número de cuenta"
        value={numeroCuenta}
        onChange={(e) => setNumeroCuenta(e.target.value)}
        disabled={disabled}
        className="input"
      />
      <button
        className="btn btn-success"
        onClick={buscarCuenta}
        disabled={disabled}
      >
        Buscar
      </button>
      <button
        className="btn btn-danger"
        onClick={habilitar}
        disabled={!disabled}
      >
        Habilitar
      </button>
      {nombreCuenta && (
        <div className="nombre-cuenta">
          <p>Nombre de la cuenta: {nombreCuenta}</p>
        </div>
      )}
      <hr />
      <ModalCatalogo />
      <br />
      {mostrarAsientos && (
        <div>
          {asientosList.map((asientos, index) => (
            <Asiento
              key={index}
              numeroAsiento={index + 1}
              asientos={asientos}
              handleNumeroCuentaChange={handleNumeroCuentaChange}
              handleNombreCuentaChange={handleNombreCuentaChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AgregarCuenta;
