# DuckFeed

## Link

### [AWS Application](www)

### [Git Repository](https://github.com/c1495616js/DuckFeed)


## Approach to the problem

- Google search for images how to report on data. And realize that using Data Visualization and with searching function are better.
- In order to understand what user will submit data, I create Login and Signup. We can connect to the user and maybe give them credits for their contribution. And I want to develop the application to have chatting function so that users can communicate about feeding ducks.
- For setting a repeating schedule, I use crontab.


## Technologies Chosen (and why)

> Database: MySQL
- Familiar with.
- Easily combined with Codeigniter.


> Api Server: Codeigniter

- Familiar with.
- There are more useful functions from my previous work experience, so that I can inherit from it.

> Frontend: React.js

- Familiar with, because I use this more often in my side projects.
- Better for data store management and showing data reactively.
- As a JavaScript Enthusiast myself.

> Docker, Docker-Compose
- Easily deploy to AWS and develop without installing many packages on local machine.

## High-Level Component Diagram

[Link](https://www.draw.io/#G1fyPlR5_pVBQkLjgzuf9vyfdt1Lgshr7m)

![](https://i.imgur.com/2Jc3Lui.png)


## Database Model Diagram

[Link](https://www.draw.io/#G1HGbTUZxRoovAeFATl4EQNUopSLnp7Wkd)

![](https://i.imgur.com/wsCmnue.png)



## How Many Hours Spent

- Roughly 23 hours



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