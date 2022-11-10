-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-12-2018 a las 16:43:26
-- Versión del servidor: 5.7.23
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `productos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `iProducto` int(11) NOT NULL AUTO_INCREMENT,
  `sCodigo` varchar(10) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `sNombre` varchar(20) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `rPrecio` float DEFAULT NULL,
  PRIMARY KEY (`iProducto`),
  KEY `sCodigoIndice` (`sCodigo`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`iProducto`, `sCodigo`, `sNombre`, `rPrecio`) VALUES
(1, 'C001', 'Manzana', 5000),
(2, 'C002', 'gaseosa', 8000),
(3, 'C003', 'papitas', 1500),
(14, 'C001', 'producto', 8000),
(16, 'C001', 'producto', 8000),
(18, 'C001', 'producto', 8000),
(19, 'C001', 'producto', 8000),
(21, 'C002', 'pera', 4000),
(22, 'C002', 'pera', 800),
(23, 'C008', 'aguacate', 600),
(24, 'C009', 'hamburguesa', 3500),
(25, 'C009', 'SALCHICHA', 1500);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
