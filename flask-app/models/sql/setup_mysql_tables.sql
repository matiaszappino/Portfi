--
-- Table structure for table `assets`
--

USE portfi;

CREATE TABLE IF NOT EXISTS `assets` (
  `name` varchar(250) NOT NULL,
  `ticker` varchar(20) NOT NULL,
  `asset_id` INT NOT NULL AUTO_INCREMENT,
  `asset_type` varchar(100),
  `exchange` varchar(50),
  `sector` varchar(100),
  PRIMARY KEY (`ticker`),
  UNIQUE(`asset_id`)
);
CREATE INDEX idx_tick ON assets (ticker(20));

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` varchar(60) NOT NULL,
  `name` varchar(100),
  `email` varchar(100),
  `password` varchar(100),
  PRIMARY KEY (`user_id`),
  UNIQUE(`email`)
);

CREATE TABLE IF NOT EXISTS `portfolio` (
  `portfolio_id` varchar(60) NOT NULL UNIQUE,
  `name` varchar(100),
  `risk` INT,
  `total_available` FLOAT,
  PRIMARY KEY (`portfolio_id`)
);

CREATE TABLE IF NOT EXISTS `relationship_up` (
  `user_id` varchar(60) NOT NULL,
  `portfolio_id` varchar(60) NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(portfolio_id) REFERENCES portfolio(portfolio_id)
);

CREATE TABLE IF NOT EXISTS `relationship_pa` (
  `portfolio_id` varchar(60) NOT NULL,
  `ticker` varchar(20) NOT NULL,
  `weight` FLOAT NOT NULL,
  FOREIGN KEY(portfolio_id) REFERENCES portfolio(portfolio_id),
  FOREIGN KEY(ticker) REFERENCES assets(ticker)
);

CREATE TABLE IF NOT EXISTS `relationship_etf` (
  `ticker` varchar(20) NOT NULL,
  `bond` FLOAT NOT NULL,
  `stock` FLOAT NOT NULL,
  FOREIGN KEY(ticker) REFERENCES assets(ticker)
);

CREATE TABLE `prices` (
  `ticker` VARCHAR(20) NOT NULL, 
  `date` DATE, 
  `price` FLOAT, 
  FOREIGN KEY(ticker) REFERENCES assets (ticker)
);

CREATE INDEX idx_tick ON prices (ticker(20));
