# DuckFeed

![](https://i.imgur.com/zlsMudm.png)


## Links

### [AWS Application](ec2-18-191-224-169.us-east-2.compute.amazonaws.com)

### [Git Repository](https://github.com/c1495616js/DuckFeed)

----

## Install in Local machine

#### git

```
$ git clone https://github.com/c1495616js/DuckFeed

$ cd DuckFeed
```

#### run docker-compose
```
$ docker-compose  --file ./docker-compose.dev.yml up
```

#### create tables to the db container

```
$ docker exec -it CONTAINER-ID mysql -uroot -p

// password: admin
```
for example:

```
$ docker exec -it 5bb43 mysql -uroot -p
```

![](https://i.imgur.com/fnVxZSE.png)



In mysql command:
```
use api;
```

![](https://i.imgur.com/Kbh7QFu.png)

create tables

```
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
  `park` varchar(20) NOT NULL DEFAULT '',
  `numbers` bigint(20) NOT NULL DEFAULT '0',
  `time` datetime NOT NULL,
  `is_regular` tinyint(11) NOT NULL DEFAULT '0',
  `had_regular` tinyint(11) NOT NULL DEFAULT '0',
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

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(20) NOT NULL DEFAULT '',
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#### crontab

- For setting a repeating schedule

```
$ crontab -e
```

```
0 4 * * * curl -X GET http://18.191.224.169:8000/index.php/feed/check_repeating
```

#### Connect

connect to http://localhost:3000