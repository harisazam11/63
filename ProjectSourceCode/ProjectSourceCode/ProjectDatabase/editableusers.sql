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
-- Table structure for table `editableusers`
--

CREATE TABLE `editableusers` (
  `Student_ID` int(20) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `cnic` varchar(15) DEFAULT NULL,
  `domicile` varchar(50) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `program_of_study` varchar(100) DEFAULT NULL,
  `apply_for` varchar(100) DEFAULT NULL,
  `batch` varchar(20) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `cms_id` varchar(20) DEFAULT NULL,
  `registration_no` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `editableusers`
--

INSERT INTO `editableusers` (`Student_ID`, `full_name`, `father_name`, `email`, `date_of_birth`, `cnic`, `domicile`, `gender`, `province`, `city`, `phone`, `address`, `program_of_study`, `apply_for`, `batch`, `semester`, `cms_id`, `registration_no`) VALUES
(11, 'Ali', 'Umer', 'saeedullah53493@gmail.com', NULL, '1560704266877', 'Swat', 'Male', 'KPK', NULL, '1234567890', '123 Main St', 'Computer Science', 'Degree', 'Fall 2020', NULL, '89734', 'REG123'),
(14, 'Hammas', 'James Brown', 'saeedullah53493@gmail.com', NULL, '4567890123456', 'MoreDomicile', 'Male', 'MoreProvince', NULL, '4567890123', 'Chasma Chowk, Near BUITEMS Quetta ', 'Civil Engineering', 'Diploma', 'Batch4', NULL, 'CMS321', 'REG321'),
(17, 'Wajid ', 'khan', 'saeedullah53493.com', NULL, '1560704266877', 'Swat', 'Male', 'KPK', NULL, '2345678901', 'Near BUITEMS University Quetta Baluchistan ', 'Mechanical Engineering', 'Degree', 'Batch2', NULL, '89076', 'REG456'),
(14, 'Hammas', 'James Brown', 'saeedullah53493@gmail.com', NULL, '4567890123456', 'MoreDomicile', 'Male', 'MoreProvince', NULL, '4567890123', 'Chasma Chowk, Near BUITEMS Quetta ', 'Civil Engineering', 'Degree', 'Batch4', NULL, '9087', 'REG321'),
(15, 'Hammas', 'Tahir', 'hammask406@gmail.com', NULL, '5440068782867', 'Killa Abdullah', 'Male', 'Baluchistan', NULL, '03174746634', 'Chasma Chowk, Near BUITEMS Quetta', 'Software Engineering', 'Degree', 'Fall 2020', NULL, '53851', 'REG654'),
(19, 'Bob Brown', 'James Brown', 'bob.brown@example.com', NULL, '4567890123456', 'MoreDomicile', 'Male', 'MoreProvince', NULL, '4567890123', '321 Pine St', 'Civil Engineering', 'Diploma', 'Batch4', NULL, '53847', 'REG321'),
(16, 'John Doe', 'Robert Doe', 'saeedullah53493@gmail.com', NULL, '1560704266877', 'SomeDomicile', 'Male', 'KPK', NULL, '1234567890', '123 Main St', 'Computer Science', 'Degree', 'Batch1', NULL, '53493', 'Fall-2020/BSSE53493'),
(25, 'SAEEDULLAH', 'Nawab', 'saeedullah53493@gmail.com', NULL, '1560704266877', 'Swat', 'Male', 'KPK', NULL, '03494322293', 'Chasma Chowk, Near BUITEMS Quetta', 'Computer Science', 'Degree', 'Fall-2020', NULL, '59876', 'Fall-2020/BSSE53123'),
(19, 'Ali', 'James Brown', 'saeedullah53493@example.com', NULL, '4567890123456', 'MoreDomicile', 'Male', 'MoreProvince', NULL, '4567890123', '321 Pine St', 'Civil Engineering', 'Diploma', 'Batch4', NULL, '53847', 'REG321'),
(16, 'SAEEDULLAH', 'Robert Doe', 'saeedullah53493@gmail.com', NULL, '1560704266877', 'SomeDomicile', 'Male', 'KPK', NULL, '1234567890', '123 Main St', 'Computer Science', 'Degree', 'Batch1', NULL, '53493', 'Fall-2020/BSSE53493'),
(16, 'SAEEDULLAH', 'khan', 'saeedullah53493@gmail.com', NULL, '1560704266877', 'SomeDomicile', 'Male', 'KPK', NULL, '1234567890', '123 Main St', 'Computer Science', 'Degree', 'Batch1', NULL, '53493', 'Fall-2020/BSSE53493');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
