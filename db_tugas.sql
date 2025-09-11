-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 11, 2025 at 10:52 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tugas`
--

-- --------------------------------------------------------

--
-- Table structure for table `contents`
--

CREATE TABLE `contents` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contents`
--

INSERT INTO `contents` (`id`, `user_id`, `title`, `body`, `created_at`, `updated_at`) VALUES
(1, 2, 'Hayam', 'Wuruk', '2025-09-10 06:35:27', '2025-09-10 06:48:55'),
(2, 2, 'Anjay', 'Mabar.', '2025-09-10 06:39:30', '2025-09-10 06:39:30'),
(3, 2, 'Profesional', 'Dimas Anjay Mabar.', '2025-09-10 06:39:50', '2025-09-10 06:39:50'),
(5, 1, 'Belajar jadi fullstack ', 'Role sebagaik fullstack', '2025-09-11 07:43:25', '2025-09-11 07:43:25'),
(6, 1, '12345', 'qwertty', '2025-09-11 07:44:09', '2025-09-11 07:44:09'),
(8, 1, 'mobi', 'butut', '2025-09-11 08:05:23', '2025-09-11 08:53:46'),
(9, 1, 'keren', 'maaf', '2025-09-11 09:00:52', '2025-09-11 09:00:52');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'reza', 'reza@mail.com', '$2b$10$djBeT3DhdbSP1wUWaX4rEuNvKJc4wQfOzevNTPOZCBWmamJ0VZ8zW', '2025-09-09 14:31:45', '2025-09-09 14:31:45'),
(2, 'Budi Darmawan', 'budi@email.com', '$2b$10$uNdQonxkZrhaWS176goTYuj0Wgy.0lUQtvVgAqFeC.DRmGPCvhsWq', '2025-09-09 16:12:30', '2025-09-09 16:12:30'),
(3, 'abuy', 'abuy@email.com', '$2b$10$/b76zYdO6CraLdAzEX8NeOJWHK3rWuFZzDyV1Si02M..WCxMJxe8m', '2025-09-10 07:10:46', '2025-09-10 07:10:46'),
(4, 'yuda', 'yuda@email.com', '$2b$10$HHw2xv4TAPOYqSQaGzzMvefX.cY6GkStQiK.SRQxDEjcKk0hUM.ei', '2025-09-10 07:18:59', '2025-09-10 07:18:59'),
(5, 'Fakhri habib', 'fakhri@mail.com', '$2b$10$ck.o6KXlia.ARS19dqSnDO797wcxhPPDEV7Wsrlw3I.CYt2jOSyvK', '2025-09-11 07:31:31', '2025-09-11 07:31:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contents`
--
ALTER TABLE `contents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contents`
--
ALTER TABLE `contents`
  ADD CONSTRAINT `contents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
