-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2022 at 03:39 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realtorproagents`
--

-- --------------------------------------------------------

--
-- Table structure for table `agent_plans`
--

CREATE TABLE `agent_plans` (
  `id` int(11) NOT NULL,
  `plan_name` varchar(150) NOT NULL,
  `amount` decimal(6,2) NOT NULL,
  `billing_cycle` enum('Monthly','Yearly') NOT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `address1` varchar(250) NOT NULL,
  `address2` varchar(250) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip` varchar(100) NOT NULL,
  `home_phone` varchar(255) NOT NULL,
  `work_phone` varchar(255) NOT NULL,
  `mobile_phone` varchar(255) NOT NULL,
  `fax` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `email2` varchar(100) NOT NULL,
  `birthday` varchar(100) NOT NULL,
  `stars` varchar(100) NOT NULL,
  `contact_name2` varchar(100) NOT NULL,
  `contact_phone2` varchar(100) NOT NULL,
  `contact_email2` varchar(100) NOT NULL,
  `contact_birthday2` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `first_name`, `last_name`, `company`, `address1`, `address2`, `city`, `state`, `zip`, `home_phone`, `work_phone`, `mobile_phone`, `fax`, `email`, `email2`, `birthday`, `stars`, `contact_name2`, `contact_phone2`, `contact_email2`, `contact_birthday2`, `created_at`, `updated_at`) VALUES
(536, 'eyno', 'soft', 'comany name', 'hggcnb m 54', 'xcxvv', 'indore', 'mp', '452001', '22547689', '65868979', '24545766', '65769', 'utut@gmail.com', 'test2@gmail.com', '03-06-2001', '2', 'cxxv ', '46568798', 'dss@gmail.com', '10-12-2004', '2022-04-19 17:09:01', '2022-04-19 17:09:01'),
(537, 'eyno', 'softuser', 'comany name', 'hggcnb m 54', 'Xzzc', 'indore', 'mp', '452001', '22547689', '65868979', '24545766', '65769', 'utut@gmail.com', 'gfbfh@gmail.com', '03-06-2001', '1', 'second-contact-name', '46568798', 'second@gmail.com', '10-12-2004', '2022-04-19 17:11:37', '2022-04-19 17:11:37'),
(538, 'eynotest', 'eyno123', 'vcvbnv n', 'hggcnb m 54', 'zcxvcv', 'indore', 'mp', '452001', '22547689', ' 65868979', '24545766', '34658', 'test@eyn.com', 'gfbfh@gmail.com', '03-06-2001', '', 'adsdfs', '46568798', 'second@gmail.com', '03-07-2005', '2022-04-19 17:12:34', '2022-04-19 17:12:34'),
(849, 'eyno1', 'soft1', 'vcvbnv n', 'hggcnb m 54', 'cbvn', 'indore', 'mp', '452001', '22547689', '65868979', '24545766', '65769', 'test@eyn.com', 'ZXzx@gmail.com', '3/6/2001', '1', '46568798', 'dss@gmail.com', '10/12/2004', '2/22/2022 10:55', '2022-04-29 18:57:57', '2022-04-29 18:57:57'),
(850, 'eyno2', 'soft2', 'vcvbnv n', 'hggcnb m 54', 'vbbm ', 'indore', 'mp', '452001', '22547689', '65868979', '24545766', '65769', 'test@eyn.com', 'ZXzx@gmail.com', '3/6/2001', '3', '46568798', 'dss@gmail.com', '10/12/2004', '2/22/2022 10:55', '2022-04-29 18:57:57', '2022-04-29 18:57:57'),
(851, 'eyno3', 'soft3', 'vcvbnv n', 'hggcnb m 54', 'ccb b', 'indore', 'mp', '452001', '22547689', '65868979', '24545766', '34658', 'utut@gmail.com', 'gfbfh@gmail.com', '3/6/2001', '4', '46568798', 'dss@gmail.com', '10/12/2004', '2/22/2022 10:56', '2022-04-29 18:57:57', '2022-04-29 18:57:57');

-- --------------------------------------------------------

--
-- Table structure for table `contacts_tags`
--

CREATE TABLE `contacts_tags` (
  `id` int(11) NOT NULL,
  `contacts_id` int(100) NOT NULL,
  `tags_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts_tags`
--

INSERT INTO `contacts_tags` (`id`, `contacts_id`, `tags_id`) VALUES
(57, 538, 71),
(58, 538, 72),
(76, 536, 71);

-- --------------------------------------------------------

--
-- Table structure for table `contact_task`
--

CREATE TABLE `contact_task` (
  `id` int(11) NOT NULL,
  `contacts_id` int(100) NOT NULL,
  `task_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_task`
--

INSERT INTO `contact_task` (`id`, `contacts_id`, `task_id`) VALUES
(57, 537, 115),
(58, 0, 116),
(60, 0, 118);

-- --------------------------------------------------------

--
-- Table structure for table `email_property`
--

CREATE TABLE `email_property` (
  `id` int(11) NOT NULL,
  `location` varchar(250) NOT NULL,
  `property_type` varchar(250) NOT NULL,
  `min_price` varchar(250) NOT NULL,
  `max_price` varchar(250) NOT NULL,
  `beds` varchar(100) NOT NULL,
  `baths` int(100) NOT NULL,
  `desired_features` varchar(500) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `email_property`
--

INSERT INTO `email_property` (`id`, `location`, `property_type`, `min_price`, `max_price`, `beds`, `baths`, `desired_features`, `name`, `email`, `phone`, `created_at`) VALUES
(1, 'test location', 'Rental', '100', '200', '1+', 2, '', 'test', 'test@eyn.com', 2147483647, '2022-05-10 00:00:00'),
(2, 'test location', 'Rental', '100', '200', '1+', 2, 'zmcxnc mx', 'test', 'utut@gmail.com', 2147483647, '2022-05-10 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `idx_order_detail`
--

CREATE TABLE `idx_order_detail` (
  `id` int(11) NOT NULL,
  `payment_mode` varchar(100) NOT NULL,
  `card_number` int(100) NOT NULL,
  `security_code` int(50) NOT NULL,
  `expire_date` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` varchar(250) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip` int(50) NOT NULL,
  `payment_id` varchar(100) NOT NULL,
  `idx_mls_period` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `auto_import_leads` varchar(1000) NOT NULL,
  `auto_opt_in_leads` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `mls` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(200) NOT NULL,
  `state` varchar(200) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` int(11) NOT NULL,
  `year_built` year(4) NOT NULL,
  `square_feet` float NOT NULL,
  `bedrooms` float NOT NULL,
  `bathrooms` float NOT NULL,
  `main_image` varchar(255) NOT NULL,
  `additional_image` text NOT NULL,
  `virtual_tour_url` varchar(255) NOT NULL,
  `featured_listing` smallint(5) NOT NULL,
  `sold_home` smallint(5) NOT NULL,
  `open_house_start_date` date NOT NULL,
  `open_house_end_date` date NOT NULL,
  `widget_code` text NOT NULL,
  `google_map` smallint(5) NOT NULL,
  `zillow` smallint(5) NOT NULL,
  `syndicate_listing` smallint(5) NOT NULL,
  `sort_order` smallint(5) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `mls`, `address`, `city`, `state`, `zip`, `title`, `description`, `price`, `category`, `year_built`, `square_feet`, `bedrooms`, `bathrooms`, `main_image`, `additional_image`, `virtual_tour_url`, `featured_listing`, `sold_home`, `open_house_start_date`, `open_house_end_date`, `widget_code`, `google_map`, `zillow`, `syndicate_listing`, `sort_order`, `created_at`, `updated_at`) VALUES
(6, 'testbbmn', 'hggcnb m 54', 'indore', 'mp', '452001', 'fsfdg', 'xfgd', '0.00', 0, 2023, 34, 23, 78, 'download (1)-20220302232904.jpg', '[\"download (1)-20220302232904.jpg\",\"download (2)-20220302232904.jpg\"]', 'null', 1, 1, '2022-03-10', '2022-03-16', 'zvcb', 1, 1, 1, 1, '2022-03-03 10:59:04', '2022-03-03 10:59:26');

-- --------------------------------------------------------

--
-- Table structure for table `listings_category`
--

CREATE TABLE `listings_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `listings_category`
--

INSERT INTO `listings_category` (`id`, `category_name`, `created_at`, `updated_at`) VALUES
(1, 'Home/Condo', '2022-01-14 17:04:57', '2022-01-14 17:04:57'),
(2, 'Lot/Land', '2022-01-14 17:04:57', '2022-01-14 17:04:57'),
(3, 'Rental', '2022-01-14 17:05:18', '2022-01-14 17:05:18'),
(4, 'Commercial', '2022-01-14 17:05:18', '2022-01-14 17:05:18');

-- --------------------------------------------------------

--
-- Table structure for table `membership_order`
--

CREATE TABLE `membership_order` (
  `id` int(11) NOT NULL,
  `userid` varchar(100) NOT NULL,
  `idx_package` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `time_period` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mls`
--

CREATE TABLE `mls` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mls`
--

INSERT INTO `mls` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'AK - Alaska MLS - AKMLS - Alaska Multiple Listing Service, Inc (187)', '2022-05-23 17:24:02', '2022-05-23 17:24:02'),
(2, 'AK - Fairbanks MLS - Fairbanks MLS (562)', '2022-05-23 17:24:02', '2022-05-23 17:24:02'),
(3, 'AK - Southeast Alaska - Southeast Alaska MLS (555)', '2022-05-23 17:24:18', '2022-05-23 17:24:18');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_method` varchar(180) NOT NULL,
  `plan_id` varchar(80) NOT NULL,
  `plan_name` varchar(180) NOT NULL,
  `duration` varchar(80) NOT NULL,
  `current_status` enum('active','inactive') NOT NULL,
  `amount` decimal(5,2) NOT NULL,
  `transaction_id` varchar(100) NOT NULL,
  `payment_status` varchar(80) NOT NULL,
  `payment_response` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tags` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tags`) VALUES
(71, 'tag1'),
(72, 'tag2');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `date` varchar(100) NOT NULL,
  `task` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `date`, `task`, `created_at`) VALUES
(115, '2022-05-12', 'test task event', '2022-04-19 17:12:56'),
(116, '2022-05-15', 'new test task event', '2022-04-19 17:13:10'),
(118, '2022-05-22', 'some task event', '2022-04-25 14:04:46');

-- --------------------------------------------------------

--
-- Table structure for table `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `added_by` varchar(100) NOT NULL,
  `theme_url` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `themes`
--

INSERT INTO `themes` (`id`, `user_id`, `added_by`, `theme_url`, `created_at`, `updated_at`) VALUES
(1, '18', ' test', 'demo.theme.com', '2022-05-17 00:00:00', '2022-05-17 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `themes_page`
--

CREATE TABLE `themes_page` (
  `id` int(11) NOT NULL,
  `theme_id` varchar(50) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `page_name` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `themes_page`
--

INSERT INTO `themes_page` (`id`, `theme_id`, `userid`, `page_name`, `created_at`, `updated_at`) VALUES
(16, '0', '0', '{\"home\":\"true\",\"property_search_idx\":\"true\",\"about_us\":\"true\",\"testimonials\":\"true\",\"agents\":\"true\",\"blog\":\"\",\"news_rss_feeds\":\"\",\"preferred_lender\":\"\",\"local_area\":\"\",\"links\":\"\",\"buyer_seller_tips\":\"\",\"school_search\":\"\",\"interest_rates\":\"\",\"calculat', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
(17, '0', '0', '{\"home\":\"true\",\"property_search_idx\":\"true\",\"about_us\":\"true\",\"testimonials\":\"true\",\"agents\":\"true\",\"blog\":\"\",\"news_rss_feeds\":\"\",\"preferred_lender\":\"\",\"local_area\":\"\",\"links\":\"\",\"buyer_seller_tips\":\"\",\"school_search\":\"\",\"interest_rates\":\"\",\"calculat', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
(18, '1', '18', '{\"home\":\"true\",\"property_search_idx\":\"true\",\"about_us\":\"\",\"testimonials\":\"\",\"agents\":\"\",\"blog\":\"true\",\"news_rss_feeds\":\"\",\"preferred_lender\":\"true\",\"local_area\":\"\",\"links\":\"\",\"buyer_seller_tips\":\"\",\"school_search\":\"\",\"interest_rates\":\"\",\"calculators\"', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
(19, '1', '18', '{\"home\":\"\",\"property_search_idx\":\"\",\"about_us\":\"\",\"testimonials\":\"\",\"agents\":\"\",\"blog\":\"\",\"news_rss_feeds\":\"\",\"preferred_lender\":\"\",\"local_area\":\"\",\"links\":\"\",\"buyer_seller_tips\":\"\",\"school_search\":\"\",\"interest_rates\":\"\",\"calculators\":\"\",\"glossary_te', '2022-05-19 00:00:00', '2022-05-19 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(70) NOT NULL,
  `user_role` smallint(6) NOT NULL,
  `user_activation_key` varchar(200) NOT NULL,
  `auth_token` varchar(150) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `user_role`, `user_activation_key`, `auth_token`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(18, 'test', 'test@eyn.com', '9876545678', 'test', 2, '', '', 1, '2021-11-15 19:07:22', '2021-11-15 19:07:22', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_themes`
--

CREATE TABLE `user_themes` (
  `id` int(11) NOT NULL,
  `theme_id` varchar(100) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_themes`
--

INSERT INTO `user_themes` (`id`, `theme_id`, `userid`, `created_at`, `updated_at`) VALUES
(1, '1', '18', '2022-05-17 00:00:00', '2022-05-17 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agent_plans`
--
ALTER TABLE `agent_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts_tags`
--
ALTER TABLE `contacts_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contacts_tags_ibfk_1` (`contacts_id`),
  ADD KEY `contacts_tags_ibfk_2` (`tags_id`);

--
-- Indexes for table `contact_task`
--
ALTER TABLE `contact_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contacts_id` (`contacts_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `email_property`
--
ALTER TABLE `email_property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `idx_order_detail`
--
ALTER TABLE `idx_order_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings_category`
--
ALTER TABLE `listings_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membership_order`
--
ALTER TABLE `membership_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mls`
--
ALTER TABLE `mls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `themes_page`
--
ALTER TABLE `themes_page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_themes`
--
ALTER TABLE `user_themes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agent_plans`
--
ALTER TABLE `agent_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=852;

--
-- AUTO_INCREMENT for table `contacts_tags`
--
ALTER TABLE `contacts_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `contact_task`
--
ALTER TABLE `contact_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `email_property`
--
ALTER TABLE `email_property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `idx_order_detail`
--
ALTER TABLE `idx_order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `listings_category`
--
ALTER TABLE `listings_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `membership_order`
--
ALTER TABLE `membership_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mls`
--
ALTER TABLE `mls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `themes_page`
--
ALTER TABLE `themes_page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_themes`
--
ALTER TABLE `user_themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contacts_tags`
--
ALTER TABLE `contacts_tags`
  ADD CONSTRAINT `contacts_tags_ibfk_1` FOREIGN KEY (`contacts_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contacts_tags_ibfk_2` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
