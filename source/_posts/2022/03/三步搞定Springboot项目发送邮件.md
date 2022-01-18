---
title: 三步搞定Springboot项目发送邮件
tags: [Springboot, 邮件]
hide: false
index_img: banner/p40.webp
banner_img: banner/p40.webp
date: 2022-03-31 23:38:53
updated:
category: Java
---

# 1、添加依赖

```xml
 <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
 </dependency>
```

# 2、配置application.yml

```yaml
spring:
  mail:
    host: smtp.office365.com  #这里用outlook邮箱
    default-encoding: utf-8
    port: 587   #端口号465或587
    protocol: smtp
    # 发送者邮箱账号，非必须配置项，可以从其它地方获取
    username: XXX@outlook.com
    # 发送者邮箱授权码，非必须配置项，但一定是发送者邮箱的授权码
    password: xxxxxxxxx
    properties:
      mail:
        debug:
          true   #开启debug日志
        smtp:
          starttls:  #outlook邮箱需要配置这个属性
            enable: true
            required: true
          socketFactory:
            class: javax.net.ssl.SSLSocketFactory
```

# 3、发送代码

PS：这是写在一个controller内部

```java
	@Resource
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @GetMapping("sendEmail")
    public String sendEmail(){
        //创建简单邮件消息
        SimpleMailMessage message = new SimpleMailMessage();
        //谁发的
        message.setFrom(from);
        //谁要接收
        message.setTo("666666666@qq.com");
        //邮件标题
        message.setSubject("我是一个标题");
        //邮件内容
        message.setText("我是一个内容");
        mailSender.send(message);
        return "success";
    }
```

