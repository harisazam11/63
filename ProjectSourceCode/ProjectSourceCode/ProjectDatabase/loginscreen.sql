-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2024 at 12:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fyp`
--

-- --------------------------------------------------------

--
-- Table structure for table `loginscreen`
--

CREATE TABLE `loginscreen` (
  `LID` int(11) NOT NULL,
  `CMS` varchar(100) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Role` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loginscreen`
--

INSERT INTO `loginscreen` (`LID`, `CMS`, `Password`, `Role`) VALUES
(2, '123', 'asd', 'Admin'),
(5, '#643#', '#taefdkiller', 'Student'),
(7, '#505:8killer', '#Bkrbm134killer', 'Admin'),
(11, '#:0886killer', '#EYqYh7jVZ6#', 'Student'),
(13, '#50559killer', '#Bkrbm@233killer', 'Admin'),
(14, '#63861killer', '#IamnasA223#', 'Admin'),
(15, '#:0886killer', '#p9K7luxrVc#', 'Student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loginscreen`
--
ALTER TABLE `loginscreen`
  ADD PRIMARY KEY (`LID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loginscreen`
--
ALTER TABLE `loginscreen`
  MODIFY `LID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
