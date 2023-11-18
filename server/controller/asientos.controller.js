import { pool } from "../db.js";

export const getAsientos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT numeroAsiento, numeroCuenta, nombreCuenta, monto, tipoMovimiento FROM asientos"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAsientosNM= async(req, res) =>{
  try{
    const[result]=await pool.query(
      "SELECT  numeroCuenta, monto, tipoMovimiento FROM asientos"
    );
  res.json(result); 
  }catch(error){
    return res.status(500).json({message:error.message});
  }
};

export const getCatalogo = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT numeroCuenta, nombreCuenta FROM catalogo"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAsiento = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT nombreCuenta FROM catalogo WHERE numeroCuenta = ?", [
      req.params.numeroCuenta,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createAsiento = async (req, res) => {
  try {
    const { numeroAsiento, numeroCuenta, nombreCuenta, monto, tipoMovimiento } = req.body;
    const [result] = await pool.query(
      "INSERT INTO asientos(numeroAsiento, numeroCuenta, nombreCuenta, monto, tipoMovimiento) VALUES (?, ?, ?, ?, ?)",
      [ numeroAsiento, numeroCuenta, nombreCuenta, monto, tipoMovimiento  ]
    );
    res.json({
      id: result.insertId,
      numeroAsiento,
      numeroCuenta,
      nombreCuenta,
      monto,
      tipoMovimiento
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const putActualizarSaldo = async (req, res) => {
  const { numeroCuenta, resultado } = req.body; // Obtener numeroCuenta y monto desde el cuerpo de la solicitud
  
  try {
    // Ejecutar una consulta SQL para actualizar el campo saldo en la tabla catalogo
    const result = await pool.query("UPDATE catalogo SET saldo = ? WHERE numeroCuenta = ?", [
      resultado,
      numeroCuenta,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Numero de cuenta no encontrado" });
    }

    res.json({ message: "Saldo actualizado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCuentasD = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT numeroCuenta, nombreCuenta, saldo FROM catalogo WHERE saldoNormal = 'D' AND saldo IS NOT NULL"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCuentasH = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT numeroCuenta, nombreCuenta, saldo FROM catalogo WHERE saldoNormal = 'H' AND saldo IS NOT NULL AND numeroCuenta <> '3010011'"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getCuentasGastos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT numeroCuenta, nombreCuenta, saldo FROM catalogo WHERE numeroCuenta LIKE '4%' AND saldo IS NOT NULL"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCuentasIngresos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT numeroCuenta, nombreCuenta, saldo FROM catalogo WHERE numeroCuenta LIKE '5%' AND saldo IS NOT NULL"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const putActualizarPerdidasGanancias = async (req, res) => {
  const { resultado } = req.body; // Obtener numeroCuenta y monto desde el cuerpo de la solicitud
  
  try {
    // Ejecutar una consulta SQL para actualizar el campo saldo en la tabla catalogo
    const result = await pool.query("UPDATE catalogo SET saldo = ? WHERE numeroCuenta = '3010011'", [
      resultado,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Numero de cuenta no encontrado" });
    }

    res.json({ message: "Saldo actualizado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCuentasActivos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT numeroCuenta, nombreCuenta, saldo FROM catalogo WHERE numeroCuenta LIKE '1%' AND saldo IS NOT NULL"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCuentasPasivosCapital = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT numeroCuenta, nombreCuenta, saldo FROM catalogo WHERE (numeroCuenta LIKE '2%' OR numeroCuenta LIKE '3%') AND saldo IS NOT NULL"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


