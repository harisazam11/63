-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2024 at 12:54 PM
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
-- Table structure for table `varifieddata`
--

CREATE TABLE `varifieddata` (
  `Student_ID` int(11) DEFAULT NULL,
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
  `batch` varchar(50) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `cms_id` varchar(20) DEFAULT NULL,
  `registration_no` varchar(200) DEFAULT NULL,
  `matric_certificate` varchar(200) DEFAULT NULL,
  `registration_card` varchar(200) DEFAULT NULL,
  `clearance_certificate` varchar(200) DEFAULT NULL,
  `cnic_photostate` varchar(200) DEFAULT NULL,
  `photograph` varchar(200) DEFAULT NULL,
  `custom_document` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `varifieddata`
--

INSERT INTO `varifieddata` (`Student_ID`, `full_name`, `father_name`, `email`, `date_of_birth`, `cnic`, `domicile`, `gender`, `province`, `city`, `phone`, `address`, `program_of_study`, `apply_for`, `batch`, `semester`, `cms_id`, `registration_no`, `matric_certificate`, `registration_card`, `clearance_certificate`, `cnic_photostate`, `photograph`, `custom_document`) VALUES
(13, 'Alice Johnson', 'David Johnson', 'alice.johnson@example.com', '1993-03-03', '3456789012345', 'YetAnotherDomicile', 'Female', 'YetAnotherProvince', 'YetAnotherCity', '3456789012', '789 Oak St', 'Electrical Engineering', 'Bachelors', 'Batch3', 'Semester3', 'CMS789', 'REG789', 'Y', 'Y', 'Y', 'Y', 'Y', 'YetAnotherDocument'),
(5, 'Jane Smith', 'Michael Smith', 'jane.smith@example.com', '1992-02-02', '2345678901234', 'AnotherDomicile', 'Female', 'AnotherProvince', 'AnotherCity', '2345678901', '456 Elm St', 'Mechanical Engineering', 'Transcript', 'Batch2', 'Semester2', 'CMS456', 'REG456', 'Y', 'Y', 'Y', 'Y', 'Y', 'AnotherDocument'),
(11, 'Ali', 'Umer', 'saeedullah53493@gmail.com', NULL, '1560704266877', 'Swat', 'Male', 'KPK', NULL, '1234567890', '123 Main St', 'Computer Science', 'Degree', 'Fall 2020', NULL, '89734', 'REG123', 'Y', 'Y', 'Y', 'Y', 'Y', 'SomeDocument'),
(12, 'Hammas', 'Michael Smith', 'saeedullah53493@gmail.com', NULL, '2345678901234', 'AnotherDomicile', 'Female', 'AnotherProvince', NULL, '2345678901', 'Mano salwa Resturant, Near Buitems Quetta Baluchistan ', 'Mechanical Engineering', 'Transcript', 'Batch2', NULL, '53653', 'REG456', 'Y', 'Y', 'Y', 'Y', 'Y', 'AnotherDocument'),
(17, 'Wajid ', 'khan', 'saeedullah53493.com', NULL, '1560704266877', 'Swat', 'Male', 'KPK', NULL, '2345678901', 'Near BUITEMS University Quetta Baluchistan ', 'Mechanical Engineering', 'Degree', 'Batch2', NULL, '89076', 'REG456', 'Y', 'Y', 'Y', 'Y', 'Y', 'AnotherDocument'),
(14, 'Hammas', 'James Brown', 'saeedullah53493@gmail.com', NULL, '4567890123456', 'MoreDomicile', 'Male', 'MoreProvince', NULL, '4567890123', 'Chasma Chowk, Near BUITEMS Quetta ', 'Civil Engineering', 'Degree', 'Batch4', NULL, '9087', 'REG321', 'Y', 'Y', 'Y', 'Y', 'Y', 'MoreDocument'),
(15, 'Hammas', 'Tahir', 'hammask406@gmail.com', NULL, '5440068782867', 'Killa Abdullah', 'Male', 'Baluchistan', NULL, '03174746634', 'Chasma Chowk, Near BUITEMS Quetta', 'Software Engineering', 'Degree', 'Fall 2020', NULL, '53851', 'REG654', 'Y', 'Y', 'Y', 'Y', 'Y', 'AnotherOneDocument'),
(25, 'SAEEDULLAH', 'Nawab', 'saeedullah53493@gmail.com', NULL, '1560704266877', 'Swat', 'Male', 'KPK', NULL, '03494322293', 'Chasma Chowk, Near BUITEMS Quetta', 'Computer Science', 'Degree', 'Fall-2020', NULL, '59876', 'Fall-2020/BSSE53123', '1721364376854-MatricCer3.pdf', '1721364362601-MatricCer2.pdf', '1721366970213-ClearanceForm.pdf', '1721364297172-CNIC3.pdf', '1721232021321-saeed_.jpg', 'undefined');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
