---
title: 读取yml文件时遇到的坑
date: 2019-10-19 15:54:36
tags: [Java,Springboot]
category: Java
index_img: banner/p20.webp
banner_img: banner/p20.webp
---

1、在测试类里使用@Value("${server.port}")获取端口返回的值是-1，解决方法：在@SpringBootTest注解后面加上如下属性：

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)

原理：

```
org.springframework.boot.test.context.SpringBootContextLoader＃getInlinedProperties
```

```java
protected String[] getInlinedProperties(MergedContextConfiguration config) {
    ArrayList<String> properties = new ArrayList<String>();
    // JMX bean names will clash if the same bean is used in multiple contexts
    disableJmx(properties);
    properties.addAll(Arrays.asList(config.getPropertySourceProperties()));
    if (!isEmbeddedWebEnvironment(config) && !hasCustomServerPort(properties)) {
        properties.add("server.port=-1");
    }
    return properties.toArray(new String[properties.size()]);
}
```

2、使用@ConfigurationProperties方式读取yml文件中的属性时，prefix的值不能有大写，如：prefix = "myProps"， 这样写会报错，所以yml文件中的key一定要是小写。

PS：我使用的是springboot 2.X版本，springboot 1.5以下版本貌似不存在此类问题！