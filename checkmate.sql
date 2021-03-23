-- -------------------------------------------------------------
-- TablePlus 3.12.5(364)
--
-- https://tableplus.com/
--
-- Database: checkmate
-- Generation Time: 2021-03-23 14:27:56.0670
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `cards`;
CREATE TABLE `cards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `list` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `lists`;
CREATE TABLE `lists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `card` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `admin` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cards` (`id`, `user`, `title`, `list`) VALUES
(1, 3, 'Supermarkt', 1),
(2, 3, 'Bakery', 1),
(13, 3, 'Homework', 43),
(18, 3, 'Vaccuum', NULL),
(25, 3, 'Vaccuuming', 90),
(34, 3, 'Others', 43),
(35, 3, 'Clean', 90),
(36, 3, 'Butcher', 1),
(37, 14, 'School', 93);

INSERT INTO `lists` (`id`, `title`, `user`) VALUES
(1, 'Groceries', '3'),
(43, 'School', '3'),
(90, 'Home', '3'),
(93, 'School', '14');

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `user`, `duration`, `card`) VALUES
(1, 'Tomatoess', 'Red tomatoes', 'Not Started', '3', '80', '1'),
(2, 'Milk', 'Buy milk at the supermarket', 'Not Started', '3', '50', '1'),
(3, 'Bread', 'Buy bread at the bakery', 'Not Started', '3', '20', '2'),
(12, 'Cookie', 'Chocolate chip', 'Not Started', '3', '50', '2'),
(27, 'Math', 'excercise 1 - 10', 'Busy', '3', '60', '13'),
(28, 'English', 'Assigments', 'Busy', '3', '60', '13'),
(29, 'Toilet', 'Add freshener', 'Not Started', '3', '30', '35'),
(30, 'Make bed', 'Replace sheets', 'Not Started', '3', '20', '35'),
(31, 'Bedroom', 'Under the bed', 'Not Started', '3', '20', '25'),
(32, 'Hamburgers', '500gr', 'Done', '3', '15', '36'),
(33, 'School', 'Nakjijken backend', 'Busy', '14', '60', '37'),
(34, 'Buy buns', 'Buy full grain buns', 'Done', '3', '2', '2');

INSERT INTO `users` (`id`, `name`, `email`, `password`, `admin`, `avatar`) VALUES
(3, 'Remy Nijsten', 'remy@checkmate.com', '$2y$10$rFXWwVN/ItF4Xvcs61RjKOzKVxSJzzzkaFbAQetQCWosfo32qAXgm', NULL, NULL),
(14, 'Jeroen', 'Jeroen@checkmate.com', '$2y$10$COZEtUt14c.zUk0m1JjmSusU4gfuvP8As3adI37q7beHzyyB2ZY7.', NULL, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;