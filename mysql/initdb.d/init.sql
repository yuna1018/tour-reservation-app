CREATE USER IF NOT EXISTS 'zoomzoomi'@'%' IDENTIFIED BY 'zoom123';
GRANT ALL PRIVILEGES ON *.* TO 'zoomzoomi'@'%' WITH GRANT OPTION;
CREATE DATABASE IF NOT EXISTS travel DEFAULT CHARACTER SET utf8mb4;
CREATE DATABASE IF NOT EXISTS travel_test DEFAULT CHARACTER SET utf8mb4;
FLUSH PRIVILEGES;

CREATE TABLE user (
    id int AUTO_INCREMENT primary key not null,
    name varchar(255) not null,
    type varchar(255) default 'user' not null
);
INSERT INTO user(id, name, type) VALUES (1, '줌줌', 'user');
INSERT INTO user(id, name, type) VALUES (2, '줌줌관리자', 'admin')