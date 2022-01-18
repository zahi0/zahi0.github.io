---
title: Java基础知识——访问权限控制
date: 2019-09-30 15:12:46
tags: Java基础
category: Java
index_img: banner/p4.jpg
banner_img: banner/p4.jpg
---

### 1、包：库单元

包（package）内包含有一组类，它们在单一的名字空间之下被组织在一起。使用包就是为了区分相同名字的类。

如果一个类中没有声明一个包名，那么它就是在默认包里面。

一个.java文件里可以包含多个类，但只能有一个public类，并且该类的类名和文件名相同。编译的时候每个类都会生成一个.class文件。

<!--more-->

### 2、Java访问权限修饰词

（1）包访问权限

没有使用访问权限修饰词，即默认包访问权限，对同一个包内的都可以访问，对包外的却是private。

（2）public

所有人都可以使用。

（3）private

只有在该类内可以访问，其他类都不可以访问。

（4）protected

​	该类的子类可以访问，同时还具有包访问权限（！！！）。

### 3、类的访问权限

类只有两种访问权限，包访问权限和public。

一个简单的设计模式，singleton（单例）模式，例：

```java
public class Singleton{
	private static Singleton singleton = new Singleton();
	private Singleton(){}     //核心思想：构造器私有化
	public static Singleton getInstance(){
		return singleton;
	}
}
```

