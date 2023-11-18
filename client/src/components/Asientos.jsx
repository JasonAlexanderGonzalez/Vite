import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./styles/AsientosStyle.css";
import { listarAsientos } from "./Seat";

function Asientos({
  numeroCuenta,
  nombreCuenta,
  numeroAsiento,
  monto,
  tipoMovimiento,
  handleMontoChange,
  handleTipoMovimientoChange,
  registroHabilitado,
}) {
  const [registroEnviado, setRegistroEnviado] = useState(false);

  const añadir = () => {
    // Deshabilita el botón después de hacer clic
    setRegistroEnviado(true);

    const montoSaneado = parseFloat(
      monto.replace(/[,.]/g, "").replace(",", ".")
    );

    Axios.post("http://localhost:3001/asientos", {
      numeroAsiento: numeroAsiento,
      numeroCuenta: numeroCuenta,
      nombreCuenta: nombreCuenta,
      monto: montoSaneado,
      tipoMovimiento: tipoMovimiento,
    })
      .then(() => {
        
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: "Correcto",
          icon: "success",
          timer: 3000,
        });
        //window.location.reload();
      })
      .catch((error) => {
        console.error("Error al crear empleado:", error);
      });
  };

  const isRegistroHabilitado =
    monto !== "" && tipoMovimiento !== "" && registroHabilitado;

    useEffect(() => {
      listarAsientos(); // Llama a listarCatalogo cuando el componente se monta
    }, []);

  return (
    <div>
      <div>
        <input
          className="in"
          type="hidden"
          name="numeroCuenta"
          value={numeroCuenta}
        />
        <input
          className="input nombreCuenta-disabled"
          type="text"
          name="nombreCuenta"
          value={nombreCuenta}
          readOnly // Hacer el input de nombreCuenta de solo lectura
        />
        <input
          className="input"
          type="text"
          name="monto"
          value={monto}
          onChange={(e) => {
            // Realiza la lógica de formateo de montos
            let valorActual = e.target.value;
            valorActual = valorActual.replace(/\./g, ""); // Elimina los puntos de miles
            valorActual = valorActual.replace(",", "."); // Reemplaza la coma decimal por punto
            const valorFormateado = valorActual.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            );
            handleMontoChange(valorFormateado);
          }}
          placeholder="0.0"
        />
        <select
          name="tipo"
          value={tipoMovimiento}
          onChange={(e) => handleTipoMovimientoChange(e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="D">Debe</option>
          <option value="H">Haber</option>
        </select>

        <button
          className="btn btn-success custom-padding-button"
          onClick={añadir}
          disabled={!isRegistroHabilitado || registroEnviado}
          // Combina ambas condiciones para deshabilitar el botón
        >
          Registrar
        </button>
      </div>
      <br />
    </div>
  );
}

export default Asientos;
