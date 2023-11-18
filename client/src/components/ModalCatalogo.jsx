import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TableModal from "./TableModal";
import "./styles/Catalogo.css";


function ModalCatalogo() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="catalogo-container">
        <h3>Catálogo de Productos</h3>
        <Button variant="primary" onClick={handleShow}>
          Ver Catálogo
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Listado de catalogo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableModal />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCatalogo;
