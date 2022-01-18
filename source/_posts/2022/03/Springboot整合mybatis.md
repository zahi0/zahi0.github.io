---
title: Springboot整合mybatis
tags: [Springboot, mybatis]
hide: false
index_img: banner/p33.jpeg
banner_img: banner/p33.jpeg
date: 2022-03-06 16:49:56
updated:
category: Java
---

继上篇 [Springboot整合Druid](/2019/10/21/Springboot-Druid配置/) 之后，下面继续记录一下Springboot整合mybatis的过程。

1、引入依赖

```xml
<dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.2.2</version>
</dependency>
```

2、建表

```sql
CREATE TABLE `wx_message`
(
    `id`                  bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `msg_id`              bigint(20) NOT NULL unique  COMMENT '消息ID',
    `user_id`             varchar(64) NOT NULL DEFAULT '' COMMENT '用户ID(一个OpenID)',
    `msg_type`            varchar(64) NOT NULL DEFAULT '' COMMENT '消息类型',
    `receive_msg`         varchar(2048)  NOT NULL DEFAULT '' COMMENT '收到的消息',
    `response_msg`        varchar(2048)  NOT NULL DEFAULT '' COMMENT '回复的消息',
    `create_date`         datetime NOT NULL  COMMENT '创建时间',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='公众号微信消息';
```

3、创建实体类

```java
public class WxMessage {
    private long id;
    private long msgId;
    private String msgType;
    private String userId;
    private String receiveMsg;
    private String responseMsg;
    private Date createDate;
    //省略getter和setter
}
```

4、创建mapper接口

```java
public interface WxMessageMapper {

    List<WxMessage> findAll();

    int insert(WxMessage message);
}
```

5、在resources目录下创建WxMessageMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zahi.hrms.employee.mapper.WxMessageMapper">
    <select id="findAll" resultType="WxMessage">
        select * from wx_message
    </select>

    <insert id="insert" parameterType="WxMessage">
        insert into wx_message (msg_id, user_id, msg_type, receive_msg, response_msg, create_date)
                        values (#{msgId}, #{userId}, #{msgType}, #{receiveMsg}, #{responseMsg}, #{createDate} )
    </insert>

</mapper>
```

注意：

(1) 这个文件的名字和上面的mapper接口的类名一致

(2) namespace是上面mapper接口的全限定类名

(3) select / insert等标签的id要和mapper接口里的方法名一致

<br>

ps：到现在主要目录结构如下

<div align=center>
<img src="Springboot整合mybatis/image-20220306172657618.png" alt="目录结构" style="zoom:50%;" />
</div>



6、在启动类里面添加MapperScan注解，扫描所有mapper接口

```java
@SpringBootApplication
@MapperScan("com.zahi.hrms.employee.mapper")
public class EmployeeApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmployeeApplication.class, args);
    }
}
```

7、在application.yml添加配置

```yaml
#mybatis的相关配置
mybatis:
  #mapper配置文件
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.zahi.hrms.employee.entity
  #开启驼峰命名
  configuration:
    map-underscore-to-camel-case: true
```

ps：配置type-aliases-package之后，上面的WxMessageMapper.xml里面的resultType和parameterType就可以只写类名，不用写全限定类名了。

<br>

END
