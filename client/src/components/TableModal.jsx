import React, { useState, useEffect } from "react";
import Axios from "axios";
// import "./styles/Catalogo.css";


function TableModal() {
  const [listaCatalogo, setListaCatalogo] = useState([]);
  const listarCatalogo = () => {
    Axios.get("http://localhost:3001/catalogo")
      .then((res) => {
        setListaCatalogo(res.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de catalogos:", error);
      });
  };

  useEffect(() => {
    listarCatalogo(); // Llama a listarCatalogo cuando el componente se monta
  }, []);

  return (
    <>
  <table className="custom-table table table-striped">
            <thead>
          <tr>
            <th scope="col">Numero Cuenta</th>
            <th scope="col">Nombre Cuenta</th>
          </tr>
        </thead>
        <tbody>
          {listaCatalogo.map((val) => {
            return (
              <tr key={val.numeroCuenta}>
                <th>{val.numeroCuenta}</th>
                <td>{val.nombreCuenta}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableModal;
