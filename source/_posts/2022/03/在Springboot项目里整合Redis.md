---
title: 在Springboot项目里整合Redis
tags: [Springboot, Redis]
hide: false
index_img: banner/p30.jpg
banner_img: banner/p30.jpg
date: 2022-03-03 15:29:24
updated:
category: Java
---

基本上现在很多项目都会用到Redis，在项目里整合Redis也是非常简单，只须两步：

# 1、添加依赖

首先在pom文件里引入Redis依赖

```
<!--redis依赖配置-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

# 2、添加配置

其次在yml文件里添加Redis所需的配置

```yaml
spring:
  redis:
    host: 127.0.0.1 # Redis服务器地址
    database: 0 # Redis数据库索引（默认为0）
    port: 6379 # Redis服务器连接端口
    password: 123456 # Redis服务器连接密码（默认为空）
    jedis:
      pool:
        max-active: 8 # 连接池最大连接数（使用负值表示没有限制）
        max-wait: -1ms # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-idle: 8 # 连接池中的最大空闲连接
        min-idle: 0 # 连接池中的最小空闲连接
    timeout: 3000ms # 连接超时时间（毫秒）
```

完。
