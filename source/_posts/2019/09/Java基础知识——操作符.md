---
title: Java基础知识——操作符
date: 2019-09-22 23:10:28
tags: Java基础
category: Java
index_img: banner/p1.jpg
banner_img: banner/p1.jpg
---

++i先递增后取值，i++先取值后递增.



对象的等价值，例：

```java
Integer n1 = new Integer(47);
Integer n2 = new Integer(47);
n1 == n2; //false
n1.equals(n2); //true

class Value{
    int i;
}
Value v1 = new Value();
Value v2 = new Value();
v1.i = v2.i = 100;
v1.equals(v2); //false，自己创建的类会这样，除非覆盖equals方法
```

<!--more-->

移位操作符： i << j ，将i向左移j位，地位补0； i >> j ，将i向右移j位，>>是有符号右移操作符，当i的符号为正，高位补0，符号为负，高位补1。 i >>> j,  无符号右移操作符，无论正负，高位补0。



三元操作符：

```java
boolean-exp ? value1 : value2
```

如果boolean-exp（布尔表达式）的结果为true，就计算value1，这个计算结果也是操作符的最终产生的值。false就计算value2。



类型转换：将一种数据类型转换为另一种。例:

```
float i = 0.5f;
int j = (int) i;  // j=0
```

需要注意，浮点值转换为整型会直接把小数点后面的部分去掉。

