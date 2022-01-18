---
title: Springboot+Druid配置
date: 2019-10-21 11:20:30
tags: [Java,Springboot,Druid]
category: Java
index_img: banner/p19.webp
banner_img: banner/p19.webp
---

 最近在学习数据库连接池，了解到阿里开发的 [druid](https://github.com/alibaba/druid) 非常强大，所以打算拿来练练手， 然而在配置时看了很多博文都配置不好，最后终于找到一篇有用的，原文地址 https://segmentfault.com/a/1190000019741217?utm_source=tag-newest

废话少说，下面开搞：

<!--more-->

<br>

1、pom

```xml
 <dependencies>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.20</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
    </dependencies>
```

<br>

2、application.yml

```yml
spring:
  datasource:
    username: root  #数据库账号密码记得修改为自己的
    password: root
    url: jdbc:mysql://localhost:3306/databasename?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8
    #上面的databasename记得改为自己的
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource
    initialSize: 5
    minIdle: 5
    maxActive: 20
    maxWait: 60000
    timeBetweenEvictionRunsMillis: 60000
    minEvictableIdleTimeMillis: 300000
    validationQuery: SELECT 1 FROM DUAL
    testWhileIdle: true
    testOnBorrow: false
    testOnReturn: false
    poolPreparedStatements: true
    filters: stat,wall,log4j  #log4j应该可以去掉，上面的依赖也去掉
    maxPoolPreparedStatementPerConnectionSize: 20
    useGlobalDataSourceStat: true
    connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
```

<br>

3、创建一个DruidConfig类

``` java
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DruidConfig {
    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource druid(){
        return new DruidDataSource();
    }
    //配置Druid的监控
    //1. 配置一个管理后台的servlet
    @Bean
    public ServletRegistrationBean statViewServlet(){
        ServletRegistrationBean bean =  new ServletRegistrationBean(new StatViewServlet(),"/druid/*");
        Map<String,String> initParams = new HashMap<>();
        initParams.put("loginUsername","admin");//账号
        initParams.put("loginPassword","12345");//密码
        initParams.put("allow","");//默认允许所有
        initParams.put("deny","192.168.123.22");//不允许的黑名单ip
        bean.setInitParameters(initParams);
        return bean;
    }
    // 2. 配置一个监控的filter
    @Bean
    public FilterRegistrationBean webStatFilter(){
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new WebStatFilter());
        Map<String,String> initParams = new HashMap<>();
        initParams.put("exclusions","*.js,*.css,/druid/*");
        bean.setInitParameters(initParams);
        bean.setUrlPatterns(Arrays.asList("/*"));
        return bean;
    }
}
```

<br>

4、运行项目，打开网址http://localhost:8080/druid/

<br>

5、下面还需要继续整合mybatis来实现对数据库的增删改查操作，请看下一篇文章：[Springboot整合Mybatis](/2022/03/06/Springboot整合mybatis/)