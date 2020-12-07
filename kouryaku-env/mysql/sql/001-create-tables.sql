-- drop --
DROP TABLE IF EXISTS `users`, `games`, `bookmarks`, `bookmark_periods` ;

-- ユーザー --
CREATE TABLE IF NOT EXISTS  `users`
(
    `user_id`       INT(20) AUTO_INCREMENT,
    `user_name`     VARCHAR(20) NOT NULL,
    `email`         VARCHAR(40) NOT NULL,
    `password`      VARCHAR(40) NOT NULL,
    `created_at`    DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ゲーム --
CREATE TABLE IF NOT EXISTS `games`
(
    `game_id`       INT(20) AUTO_INCREMENT,
    `user_id`       INT(20) NOT NULL,
    `game_name`     VARCHAR(20) NOT NULL,
    `created_at`    DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`game_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(`user_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ブックマーク --
CREATE TABLE IF NOT EXISTS `bookmarks`
(
    `bookmark_id`   INT(20) AUTO_INCREMENT,
    `game_id`       INT(20) NOT NULL,
    `bookmark_name` VARCHAR(20) NOT NULL,
    `url`           VARCHAR(100) NOT NULL,
    `category`      VARCHAR(20) DEFAULT NULL,
    `tag`           VARCHAR(100) DEFAULT NULL,
    `has_period`    BOOLEAN DEFAULT FALSE,
    `created_at`    DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`bookmark_id`),
    FOREIGN KEY (`game_id`) REFERENCES games(`game_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ブックマークの期間 --
CREATE TABLE IF NOT EXISTS `bookmark_periods`
(
    `period_id`     INT(20) AUTO_INCREMENT,
    `bookmark_id`   INT(20) NOT NULL,
    `start_date`    DATE DEFAULT NULL,
    `end_date`      DATE NOT NULL,
    `created_at`    DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`period_id`),
    FOREIGN KEY (`bookmark_id`) REFERENCES bookmarks(`bookmark_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;