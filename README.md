# Vite 
#cd client npm run dev                
#cd server npm start

#Database

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3308
-- Tiempo de generación: 19-11-2023 a las 19:55:03
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ciclocontable`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asientos`
--

DROP TABLE IF EXISTS `asientos`;
CREATE TABLE IF NOT EXISTS `asientos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numeroAsiento` int NOT NULL,
  `numeroCuenta` varchar(7) NOT NULL,
  `nombreCuenta` varchar(50) NOT NULL,
  `monto` float NOT NULL,
  `tipoMovimiento` varchar(1) NOT NULL,
  `fechaMovimiento` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `asientos`
--

INSERT INTO `asientos` (`id`, `numeroAsiento`, `numeroCuenta`, `nombreCuenta`, `monto`, `tipoMovimiento`, `fechaMovimiento`) VALUES
(1, 1, '1010001', 'Efectivo', 1500000, 'D', '2023-11-19 19:50:01'),
(2, 1, '3010001', 'Aporte Socios', 1500000, 'H', '2023-11-19 19:50:03'),
(3, 2, '1010001', 'Efectivo', 35000, 'H', '2023-11-19 19:50:30'),
(4, 2, '4010011', 'Combustible', 35000, 'D', '2023-11-19 19:50:32'),
(5, 3, '1010001', 'Efectivo', 1000000, 'D', '2023-11-19 19:51:00'),
(6, 3, '1010011', 'Cuenta por cobrar', 1000000, 'D', '2023-11-19 19:51:02'),
(7, 3, '5010001', 'Ingresos general actividad', 2000000, 'H', '2023-11-19 19:51:03'),
(8, 4, '1010011', 'Cuenta por cobrar', 1000000, 'H', '2023-11-19 19:51:20'),
(9, 4, '1010001', 'Efectivo', 1000000, 'D', '2023-11-19 19:51:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo`
--

DROP TABLE IF EXISTS `catalogo`;
CREATE TABLE IF NOT EXISTS `catalogo` (
  `numeroCuenta` varchar(7) NOT NULL,
  `nombreCuenta` varchar(50) NOT NULL,
  `saldoNormal` varchar(1) NOT NULL,
  `saldo` float DEFAULT NULL,
  PRIMARY KEY (`numeroCuenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `catalogo`
--

INSERT INTO `catalogo` (`numeroCuenta`, `nombreCuenta`, `saldoNormal`, `saldo`) VALUES
('1010001', 'Efectivo', 'D', 3915000),
('1010006', 'Banco', 'D', NULL),
('1010011', 'Cuenta por cobrar', 'D', 0),
('1010016', 'Documento por cobrar', 'D', NULL),
('1010021', 'Alquiler por cobrar', 'D', NULL),
('1010026', 'Caja chica', 'D', NULL),
('1010031', 'Inventario', 'D', NULL),
('1020001', 'Edificio', 'D', NULL),
('1020006', 'Terreno', 'D', NULL),
('1020011', 'Vehiculo', 'D', NULL),
('1020016', 'Mobiliario', 'D', NULL),
('1030001', 'Alquiler pagado por adelantado', 'D', NULL),
('1030006', 'Salario pagado por adelantado', 'D', NULL),
('2010001', 'Cuentas por pagar', 'H', NULL),
('2010006', 'Documento por pagar', 'H', NULL),
('2010011', 'Alquiler por pagar', 'H', NULL),
('2010016', 'Depreciación acumulada Edificio', 'H', NULL),
('2010021', 'Depreciación acumulada Vehiculo', 'H', NULL),
('2010026', 'Depreciación Acumulada Mobiliario', 'H', NULL),
('2020001', 'Alquiler cobrado por adelantado', 'H', NULL),
('2020006', 'Salario cobrado por adelantado', 'H', NULL),
('3010001', 'Aporte Socios', 'H', 1500000),
('3010006', 'Retiro de Socios', 'H', NULL),
('3010011', 'Pérdidas y ganancias', 'H', 2415000),
('4010001', 'Alquiler', 'D', NULL),
('4010006', 'Salario', 'D', NULL),
('4010011', 'Combustible', 'D', 35000),
('4010016', 'Agua', 'D', NULL),
('4010021', 'Electricidad', 'D', NULL),
('4010026', 'Internet', 'D', NULL),
('4010031', 'Mantenimiento vehiculo', 'D', NULL),
('4010036', 'Mantenimiento Edificio', 'D', NULL),
('4010041', 'Depreciación Edificio', 'D', NULL),
('4010046', 'Depreciación Vehiculo', 'D', NULL),
('4010051', 'Depreciación Mobiliario', 'D', NULL),
('5010001', 'Ingresos general actividad', 'H', 2450000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `cedula` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `cedula`, `nombre`, `apellidos`) VALUES
(1, 702900297, 'Tristan', 'Lopez Barahona'),
(2, 702340235, 'Adriana', 'Aguilar'),
(3, 702330346, 'Jason', 'Gonzalez'),
(4, 706530242, 'Ismael', 'Gomez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

DROP TABLE IF EXISTS `facturas`;
CREATE TABLE IF NOT EXISTS `facturas` (
  `idFactura` int NOT NULL AUTO_INCREMENT,
  `numeroCuenta` varchar(7) NOT NULL,
  `nombreCuenta` varchar(50) NOT NULL,
  `idCliente` int NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `monto` double NOT NULL,
  `estado` varchar(15) NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (`idFactura`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`idFactura`, `numeroCuenta`, `nombreCuenta`, `idCliente`, `fechaCreacion`, `monto`, `estado`) VALUES
(10, '1010011', 'Cuenta por cobrar', 122, '2023-11-19 17:24:26', 22000, 'Pendiente'),
(28, '1010011', 'Cuenta por cobrar', 3, '2023-11-19 19:52:18', 450000, 'Cancelada'),
(29, '1010011', 'Cuenta por cobrar', 3, '2023-11-19 19:53:36', 450000, 'Cancelada');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
