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
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `Student_ID` int(11) NOT NULL,
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
-- Dumping data for table `students`
--

INSERT INTO `students` (`Student_ID`, `full_name`, `father_name`, `email`, `date_of_birth`, `cnic`, `domicile`, `gender`, `province`, `city`, `phone`, `address`, `program_of_study`, `apply_for`, `batch`, `semester`, `cms_id`, `registration_no`, `matric_certificate`, `registration_card`, `clearance_certificate`, `cnic_photostate`, `photograph`, `custom_document`) VALUES
(16, 'SAEEDULLAH', 'khan', 'saeedullah53493@gmail.com', NULL, '1560704266877', 'SomeDomicile', 'Male', 'KPK', NULL, '1234567890', '123 Main St', 'Computer Science', 'Degree', 'Batch1', NULL, '53493', 'Fall-2020/BSSE53493', '1721364376854-MatricCer3.pdf', '1721364362601-MatricCer2.pdf', '1721366970213-ClearanceForm.pdf', '1721364297172-CNIC3.pdf', '1721232021321-saeed_.jpg', 'SomeDocument'),
(19, 'Ali', 'James Brown', 'saeedullah53493@example.com', NULL, '4567890123456', 'MoreDomicile', 'Male', 'MoreProvince', NULL, '4567890123', '321 Pine St', 'Civil Engineering', 'Diploma', 'Batch4', NULL, '53847', 'REG321', '1721364966384-MatricCer1.pdf', '1721364362601-MatricCer2.pdf', '1721366970213-ClearanceForm.pdf', '1721130169951-CNIC.pdf', '1721331310024-mypic45.JPG', 'MoreDocument'),
(20, 'Carol White', 'Thomas White', 'carol.white@example.com', '1994-05-05', '5678901234567', 'AnotherOneDomicile', 'Female', 'AnotherOneProvince', 'lower Dir', '5678901234', '654 Cedar St', 'Software Engineering', 'Masters', 'Batch5', '2nd', 'CMS654', 'REG654', '1721364362601-MatricCer2.pdf', '1721364376854-MatricCer3.pdf', '1721366970213-ClearanceForm.pdf', '1721364342536-CNIC1.pdf', '1721332035900-demoImage.jpg', 'AnotherOneDocument'),
(26, 'saeedullah', 'khan', 'saeedullah53493@gmail.com', '2024-09-20', '1560704266877', 'swat', 'Male', 'KPK', 'Swat', '03494322293', 'Chasma Chowk, Near BUITEMS Quetta', 'Software Engineering', 'Transcript', 'Fall-2020', '8th', '53493', 'Fall-2020/BSSE53123', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`Student_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `Student_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
