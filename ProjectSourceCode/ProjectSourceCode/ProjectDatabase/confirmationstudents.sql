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
-- Table structure for table `confirmationstudents`
--

CREATE TABLE `confirmationstudents` (
  `CID` int(22) NOT NULL,
  `Name` varchar(55) NOT NULL,
  `CMS` varchar(55) NOT NULL,
  `CNIC` varchar(55) NOT NULL,
  `Received` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `confirmationstudents`
--

INSERT INTO `confirmationstudents` (`CID`, `Name`, `CMS`, `CNIC`, `Received`) VALUES
(1, 'saeed', '53493', '3243252', 'Yes'),
(2, 'hammas', '53851', '5440068782867', 'Yes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `confirmationstudents`
--
ALTER TABLE `confirmationstudents`
  ADD PRIMARY KEY (`CID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `confirmationstudents`
--
ALTER TABLE `confirmationstudents`
  MODIFY `CID` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
