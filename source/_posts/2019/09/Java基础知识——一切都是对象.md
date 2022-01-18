---
title: Java基础知识--一切都是对象
date: 2019-09-16 15:54:36
tags: Java基础
category: Java
index_img: banner/p6.jpg
banner_img: banner/p6.jpg
---

## 1 用引用操作对象

Java使用**引用（reference）**来操作对象，就像使用遥控器（引用）来操作电视机（对象）。例如：

```
String  s = "abc";
```

s是引用，“abc ”是对象。当然引用也可以独立存在，不一定需要一个对象与之关联。如：

```
String s；
```

如果这时向s发送一个消息，就会返回一个运行时错误。因为s实际没有与对象关联。因此，一种安全的做法是创建一个引用的同时进行初始化。
<!--more-->
## 2 必须由你创建所有对象

一旦创建一个引用，就希望它能与一个新的对象相关联，通常用new操作符实现这一目的，new关键字的意思是“给我一个新对象”。例如

```
String s = new String("abc");
```

对象的引用存储在堆栈里，而对象存储在堆里。

基本类型也是存储在堆栈里的。

| 基本类型 | 大小    | 包装器类型 |
| -------- | ------- | ---------- |
| boolean  | -       | Boolean    |
| char     | 16 bits | Character  |
| byte     | 8 bits  | Byte       |
| short    | 16 bits | Short      |
| int      | 32 bits | Integer    |
| long     | 64 bits | Long       |
| float    | 32 bits | Float      |
| double   | 64 bits | Double     |
| void     | -       | Void       |

Java提供2个高精度计算的类：BigInteger和BigDecimal，它们大体上属于包装类，但没有对应的基本类型。BigInteger支持任意精度的整数，BigDecimal支持任意精度的定点数。

## 3 永远不要销毁对象

大多数过程型语言都有作用域（scope）的概念，作用域决定了在其内定义的变量名的可见性与生命周期，在C、C++、Java中，作用域由花括号的位置决定。

```java
//在作用域1内只有x有效，在作用域2内x和y都有效，y只在作用域2内有效
{ //start of scope 1
	int x = 12;
	{ //start of scope 2
		int y = 13;
	}  //end of scope 2
} //end of scope 1
```

尽管以下代码在C和C++中是合法的，但在Java中却不能这样写。因为C和C++允许将一个较大作用域的变量隐藏起来，而Java不允许。

```java
{
	int x = 12;
	{
		int x = 13;  //Illegal
	}
}
```

Java对象不具备和基本类型一样的生命周期。当用new创建一个对象时，它可以存活于作用域之外。

```java
{
	String s = new String("abc");
}
```

引用s在作用域终点就消失了，然而s指向的对象仍然占据内存空间，直到该对象被垃圾回收器回收掉。

## 4 创建新的数据类型：类

Java使用**class**关键字定义一个新的类型，例如：

```java
class ATypeName{ 
	// class body goes here
}
```

类里可以有两种类型的元素：**字段**（数据成员）和**方法**（成员函数）。

字段可以是任何类型的对象或者基本类型。

每个对象都有用来存储其字段的空间，普通字段不能在对象间共享（用static定义的字段可以）。

若类的某个成员是基本类型，即使没有进行初始化，java也会确保它获得一个默认值。

| 基本类型 | 默认值           |
| -------- | ---------------- |
| boolean  | false            |
| char     | '\u0000'  (null) |
| byte     | (byte) 0         |
| short    | (short) 0        |
| int      | 0                |
| long     | 0L               |
| float    | 0.0f             |
| double   | 0.0d             |

这些默认值对你的程序来说可能是不正确的，最好明确的对变量进行初始化。

然而上述初始化不适用于局部变量（即并非某个类的字段）。比如在某个方法中定义 int i，那么变量i可能是任意值，而不会初始化为0。

## 5 方法、参数和返回值

Java的方法决定一个对象能接收什么样的消息，方法的基本组成部分包括：名称、参数、返回值和方法体，例如：

```java
ReturnType methodName(/* Argument list */){
	// method body
}
```

方法的返回值的类型必须和返回类型（ReturnType）一致。参数列表给出了要传给方法的信息的类型和名称。参数列表所传递的实际是对象的引用（基本类型除外）。方法名和参数列表唯一地标识某个方法。

## 6 构建一个Java程序

名字空间，即包名，包名加类名是一个类的唯一标识符，以防止和其他相同名字的类发生冲突。

使用**import**关键字来导入你想要的类。例如：

``` java
import java.util.ArrayList;  //单类型导入
import java.util.*;  //按需类型导入
```

单类型导入与按需类型导入的区别请看另一篇博文[《Java import单类引入与包引入的区别》](/2019/09/17/Java%20import%E5%8D%95%E7%B1%BB%E5%BC%95%E5%85%A5%E4%B8%8E%E5%8C%85%E5%BC%95%E5%85%A5%E7%9A%84%E5%8C%BA%E5%88%AB/),实际编程中更推荐使用单类型导入。

**static**关键字

当声明一个事物是static时，就意味着这个域或者方法不会与包含它的那个类的任何对象实例关联在一起，即可以直接通过一个类来访问它的static域和static方法（当然也可以通过对象访问），例如:

```java
class A{
	public static int x = 1;
}
// 以下两种方法访问静态的x都是可以的
int i = A.x;
A a = new A();
int j = a.x;
```

## 7 你的第一个Java程序

```java
public class HelloWorld{
	public static void main(Strng[] args){
        System.out.println("Hello World!");
    }
}
```

java.lang这个类库是默认导入到每个java文件中的。System类就是这个类库里的，所以使用它不需要导入，out是System的一个静态对象，所以可以直接通过类名引用。

一个java文件可以包含一个或多个类，但必须有一个类的类名和文件名相同。

main方法是程序的入口，但并不是每个类都有main方法。main方法的参数args是一个字符串数组，作用是从命令行接收参数，它是必须的，即使在很多时候都没有用到。

## 8 注释和嵌入式文档

Java有两种注释风格：多行注释与单行注释。

多行注释如下：

```java
/* This is a comment that
  continues across lines */
```

实际很多人习惯这样写：

```java
/* This is a comment that
 * continues across lines
 */
```

单行注释如下：

```java
// this is a one-line comment
```

javadoc是一个注释提取工具，它能把代码里的注释提取出来单独形成一个文档（实际输出的是一个html文件）。

javadoc命令只能在 “ /\*\* ” 注释中出现，结束于 “ */ ” 。使用javadoc的方式主要有两种：嵌入html，或使用“文档标签”（以@开头的命令）。

javadoc只能为public和protected成员进行文档注释。

javadoc的具体使用可以看这篇文章https://blog.csdn.net/vbirdbest/article/details/80296136

## 9 编码风格

使用驼峰风格，类名每个单词首字母大写，其他内容（变量，方法名，对象引用）第一个单词首字母小写，例：

```java
class AllTheColorOfTheRainbow{
	int anIntegerRepresentingColors;
	void changeTheHueOfTheColor(int newHue){
		// ...
	}
}
```

