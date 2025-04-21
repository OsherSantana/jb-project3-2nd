-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 21, 2025 at 02:20 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_tagging_system`
--
CREATE DATABASE IF NOT EXISTS `vacation_tagging_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation_tagging_system`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('09b89832-81c3-4ea4-b016-5b0c11949097', 'Admin', 'User', 'testuser@example.com', '$2b$10$bSP/t3MxsYWkIHCYI9GGse8kXtACEBSiSmnTSoV03V2iwa/43EJs2', 'admin', '2025-04-13 05:18:26', '2025-04-20 22:32:23'),
('6c911fb1-0900-4f4b-9387-ec68fa7e984b', 'osher', 'bar', 'testuser@ex.com', '$2b$10$VlGM3i4219P4uwyIw2CGouxSeP5Oz0wUtmA3anOLKx2k2iMJdTvK.', 'user', '2025-04-16 13:59:24', '2025-04-16 13:59:24'),
('833b6c0d-61e2-4f9b-9fe1-4938d0b8b04e', 'dhjfdsghjfgjhsd', 'fghjkdfghjkdfg', 'shaha@fghjdfh.com', '$2b$10$MFu4kufLGTh.E07/FBqA7e3743UOgMjS5fX2w9DniTHpgXHisTC0a', 'user', '2025-04-20 08:54:41', '2025-04-20 08:54:41'),
('9c485dc6-fe9e-11ef-b2c4-0242ac130002', 'John', 'Doe', 'john@example.com', '$2b$10$q6h7W8/6Bg0NiFhzl9O9de7J0jXXrJZ/SKtZzQX5xUKfPVoXJPq2i', 'user', '2025-03-11 17:31:05', '2025-03-11 17:31:05'),
('9c4aa7cc-fe9e-11ef-b2c4-0242ac130002', 'Jane', 'Smith', 'jane@example.com', '$2b$10$q6h7W8/6Bg0NiFhzl9O9de7J0jXXrJZ/SKtZzQX5xUKfPVoXJPq2i', 'user', '2025-03-11 17:31:05', '2025-03-11 17:31:05'),
('9c4cadaf-fe9e-11ef-b2c4-0242ac130002', 'Bob', 'Johnson', 'bob@example.com', '$2b$10$q6h7W8/6Bg0NiFhzl9O9de7J0jXXrJZ/SKtZzQX5xUKfPVoXJPq2i', 'user', '2025-03-11 17:31:05', '2025-03-11 17:31:05'),
('c8af34c4-fe8e-11ef-b2c4-0242ac130002', 'Admin', 'User', 'admin@example.com', '$2b$10$FVJyOKqIr5x7x/Cn4/QrDeuJZikN3YBxQwT.cIsAb7SOlYBz7ufuO', 'admin', '2025-03-11 15:37:47', '2025-03-11 15:37:47');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `destination` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_file_name`, `created_at`, `updated_at`) VALUES
('017fb046-ac4d-4adb-a75d-e53499bdcf73', 'Israel, Jerusalem', 'The holy land', '2030-05-10', '2035-05-10', 8000.00, 'b96326c5-7f97-4cf2-9911-3f8e9c860dd4.jpeg', '2025-04-16 15:01:47', '2025-04-17 19:26:59'),
('26844af9-1012-4417-9d99-3d5dc9fc3ba7', 'Japan, Tokyo', 'Tokyo is  educational centre of Japan and the focus of an extensive urban complex that includes Kawasaki and Yokohama. Attractions include the Imperial Palace, encircled by stone-walled moats and broad gardens, and numerous temples and shrines', '2025-04-21', '2026-04-21', 2500.00, '422c82a3-bbd5-430d-9131-67784abfe2b6.jpeg', '2025-04-21 12:59:09', '2025-04-21 13:04:56'),
('558fea13-1bbe-11f0-9797-be66a9f70a5e', 'Cape Town, South Africa', 'Mountains, beaches and wine tours await.', '2025-06-01', '2025-06-10', 1900.00, '40cdcfb3-1ca7-471d-b2c2-81b12d6730cc.jpeg', '2025-04-17 19:01:14', '2025-04-17 19:17:21'),
('558febc5-1bbe-11f0-9797-be66a9f70a5e', 'Santorini, Greece', 'White cliffs, blue domes and ocean views.', '2025-07-05', '2025-07-15', 2200.00, '1ad19708-2222-401c-a685-28966e66b760.jpeg', '2025-04-17 19:01:14', '2025-04-17 19:19:48'),
('558fec1d-1bbe-11f0-9797-be66a9f70a5e', 'Banff, Canada', 'Lakes and wildlife in the Canadian Rockies.', '2025-08-10', '2025-08-20', 2500.00, 'ec7be3ab-0ac2-40f6-b053-98a06d63562d.jpeg', '2025-04-17 19:01:14', '2025-04-17 19:22:53'),
('558fec64-1bbe-11f0-9797-be66a9f70a5e', 'Queenstown, New Zealand', 'Adventure capital with stunning landscapes.', '2025-09-01', '2025-09-12', 2700.00, '3a5cc6be-846d-4999-91f7-6266f1e73517.jpeg', '2025-04-17 19:01:14', '2025-04-17 19:23:40'),
('57dbc9bb-1bc2-11f0-9797-be66a9f70a5e', 'Bora Bora, French Polynesia', 'A tropical paradise famous for its turquoise lagoon, overwater bungalows, and dramatic volcanic peaks. Perfect for luxurious relaxation and unforgettable sunsets.', '2025-07-10', '2025-07-20', 4500.00, '799e2608-f735-4fae-8e3f-ad526db359d7.jpeg', '2025-04-17 19:29:56', '2025-04-17 19:30:40'),
('c8b0f347-fe8e-11ef-b2c4-0242ac130002', 'Paris, France', 'Experience the magic of Paris with guided tours of the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.', '2025-06-15', '2025-06-22', 1600.00, '63210d11-6bfa-473f-9229-e33b02021baf.jpeg', '2025-03-11 15:37:47', '2025-04-17 19:18:20'),
('c8b0fbfe-fe8e-11ef-b2c4-0242ac130002', 'Cancun, Mexico', 'Relax on pristine beaches, swim in crystal-clear waters, and explore ancient Mayan ruins.', '2025-07-10', '2025-07-17', 800.00, '0067ed19-67fb-4c17-9f59-f36fc2f3d4d1.jpeg', '2025-03-11 15:37:47', '2025-04-17 19:20:44'),
('c8b10091-fe8e-11ef-b2c4-0242ac130002', 'Rome, Italy', 'Walk through the ancient ruins of the Colosseum and Forum, visit the Vatican, and enjoy authentic Italian cuisine.', '2025-09-20', '2025-09-27', 1500.00, 'e8603dbc-747d-4987-9769-b4c92556c112.jpeg', '2025-03-11 15:37:47', '2025-04-17 19:24:18'),
('df046fc6-1bbe-11f0-9797-be66a9f70a5e', 'Reykjavík, Iceland', 'Experience northern lights and hot springs in Iceland’s vibrant capital.', '2025-10-01', '2025-10-10', 2600.00, 'ec119918-153e-4d37-bf6b-67f84cbb479b.jpeg', '2025-04-17 19:05:04', '2025-04-17 19:24:47'),
('df047313-1bbe-11f0-9797-be66a9f70a5e', 'Machu Picchu, Peru', 'Explore the ancient Incan ruins high in the Andes.', '2025-11-05', '2025-11-15', 2300.00, 'c44fc5c8-8814-42c3-b415-9fdc7b034a34.jpeg', '2025-04-17 19:05:04', '2025-04-17 19:25:42');

-- --------------------------------------------------------

--
-- Table structure for table `vacation_tags`
--

CREATE TABLE `vacation_tags` (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vacation_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacation_tags`
--

INSERT INTO `vacation_tags` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('6c911fb1-0900-4f4b-9387-ec68fa7e984b', '26844af9-1012-4417-9d99-3d5dc9fc3ba7', '2025-04-21 13:16:05', '2025-04-21 13:16:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacation_tags`
--
ALTER TABLE `vacation_tags`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vacation_tags`
--
ALTER TABLE `vacation_tags`
  ADD CONSTRAINT `vacation_tags_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vacation_tags_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
