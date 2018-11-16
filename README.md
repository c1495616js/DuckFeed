```
docker exec -it CONTAINER-ID mysql -uroot -p

CREATE TABLE IF NOT EXISTS `ci_sessions` (
     `id` varchar(128) NOT NULL,
     `ip_address` varchar(45) NOT NULL,
     `timestamp` int(10) unsigned DEFAULT 0 NOT NULL,
     `data` blob NOT NULL,
     KEY `ci_sessions_timestamp` (`timestamp`)
);

CREATE TABLE `feed` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL DEFAULT '0',
  `food_id` bigint(20) NOT NULL DEFAULT '0',
  `park` varchar(20) NOT NULL DEFAULT '',
  `numbers` bigint(20) NOT NULL DEFAULT '0',
  `time` datetime NOT NULL,
  `insert_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `food` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `feed_id` bigint(20) unsigned NOT NULL,
  `name` varchar(20) NOT NULL DEFAULT '',
  `kind` varchar(20) NOT NULL DEFAULT '',
  `amount` double NOT NULL DEFAULT '0' COMMENT 'kg',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```