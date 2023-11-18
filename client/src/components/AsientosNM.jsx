import { useEffect } from "react";
import Axios from "axios";

function AsientosNM() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get("http://localhost:3001/asientos/nm");
        const data = response.data;

        // Inicializar un objeto para almacenar los datos de coincidencia por número de cuenta
        const datosCoincidentesPorCuenta = {};

        data.forEach((item) => {
          const numeroCuenta = item.numeroCuenta;
          const tipoMovimiento = item.tipoMovimiento;
          const monto = parseFloat(item.monto);

          // Verificar si ya existe un objeto para este número de cuenta
          if (!datosCoincidentesPorCuenta[numeroCuenta]) {
            datosCoincidentesPorCuenta[numeroCuenta] = {
              D: [],
              H: [],
            };
          }

          // Agregar los datos al vector correspondiente
          if (tipoMovimiento === "D") {
            datosCoincidentesPorCuenta[numeroCuenta].D.push(monto);
          } else if (tipoMovimiento === "H") {
            datosCoincidentesPorCuenta[numeroCuenta].H.push(monto);
          }
        });

        // Realizar cálculos y operaciones adicionales
        for (const numeroCuenta in datosCoincidentesPorCuenta) {
          const datosPorCuenta = datosCoincidentesPorCuenta[numeroCuenta];
          const vectorD = datosPorCuenta.D;
          const vectorH = datosPorCuenta.H;

          // Sumar los montos de los vectores "D" y "H"
          const sumaD = vectorD.reduce((acc, monto) => acc + monto, 0);
          const sumaH = vectorH.reduce((acc, monto) => acc + monto, 0);

          console.log(`Número de cuenta ${numeroCuenta}:`);
          console.log(`Suma de D: ${sumaD}`);
          console.log(`Suma de H: ${sumaH}`);

          // Realizar la comparación y resta
          let resultado;
          let mensajeResultado = "";
          if (sumaD > sumaH) {
            resultado = sumaD - sumaH;
            mensajeResultado = `El resultado es ${resultado} (D - H)`;
          } else if (sumaH > sumaD) {
            resultado = sumaH - sumaD;
            mensajeResultado = `El resultado es ${resultado} (H - D)`;
          } else {
            resultado = sumaH - sumaD;
            mensajeResultado = `El resultado es ${resultado}`;
          }

          // Llamar a la API para actualizar el campo "saldo" en la tabla "OtraTabla"
          await Axios.put(`http://localhost:3001/catalogo/act`, {
            numeroCuenta,
            resultado, // Enviar el resultado en el cuerpo de la solicitud
          });

          console.log(mensajeResultado);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, []);

  // La lista de dependencias está vacía para que se ejecute solo una vez

  // No hay necesidad de un return en este caso, ya que no se está renderizando nada en el componente

  return null;
}

export default AsientosNM;
