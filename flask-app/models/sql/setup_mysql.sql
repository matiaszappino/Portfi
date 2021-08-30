-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS portfi;
CREATE USER IF NOT EXISTS 'portfi_dev'@'localhost' IDENTIFIED BY 'PortfiPass1!';
GRANT ALL PRIVILEGES ON `portfi`.* TO 'portfi_dev'@'localhost';
GRANT SELECT ON `portfi_schema`.* TO 'portfi_dev'@'localhost';
FLUSH PRIVILEGES;
