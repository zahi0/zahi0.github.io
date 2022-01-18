---
title: Java基础知识——复用类
date: 2019-09-30 17:02:11
tags: Java基础
category: Java
index_img: banner/p5.jpg
banner_img: banner/p5.jpg
---

### 1、组合语法

组合，只需将对象引用置于新类即可。

### 2、继承语法

继承是所有OOP语言和Java中不可缺少的一部分。当创建一个类时，总是在继承，除非已明确指出要从其他类中继承，否则就是隐式地从Java的标准根类Object进行继承。

继承的关键字是extends，例：

```java
class A extends B {/* class body */}
```

子类（A）会自动获得父类（B）的所有域和方法。

其实继承就是创建一个新类，它包含一个父类的对象（隐式的）。可以在子类使用关键字**super**来引用父类对象。

<!--more-->

对父类对象的初始化也是至关重要的，方法是在构造器中调用父类构造器来执行初始化，Java会自动在子类的构造器中插入对父类构造器的调用。但是，如果没有默认的父类构造器，或者想调用一个带参数的父类构造器，就必须用super关键字显式的编写调用父类构造器的语句，并且配以适当的参数列表。

### 3、代理

代理是组合与继承之间的中庸之道，因为我们将一个成员对象置于所要构造的类中（就像组合），但与此同时我们在新类中暴露了该成员对象的所有方法（就像继承）。例：

```java
public class SpaceShipControllers{
	void up(int i){}
	void down(int i){}
	void left(int i){}
	void right(int i){}
}

public class SpaceShipDelegation{
	private SpaceShipControllers controllers = new SpaceShipControllers();
	public void up(int i){
		controllers.up(i);
	}
	public void down(int i){
		controllers.down(i);
	}
	public void left(int i){
		controllers.left(i);
	}
	public void right(int i){
		controllers.right(i);
	}
}
```

### 4、向上转型

假设有一个称为Instrument的代表乐器的父类和一个称为Wind的子类，把Wind引用转换为Instrument引用就是向上转型。

```java
Wind flute = new Wind();
Instrument i = flute;    //Upcasting
```

### 5、final关键字

final关键字指的是“这是无法改变的”。

final数据，说明该数据是恒定不变的。当对象引用使用final时，它不能再指向另一个对象，但对象其自身可以被修改。根据惯例，既是static又是final的域将用大写表示，并用下划线分割每个单词。

空白final，即被声明为final但又未给定初值的域，空白final在使用前必须被初始化。空白final可以使一个类中的final域根据对象而有所不同，却又保持其恒定不变的特性。

final参数，java允许在参数列表以声明的方式将参数指明为final，这意味着你无法在方法中更改参数引用所执向的对象。

final方法，把方法锁定，以防任何继承类修改它的含义，即不会被覆盖。类中的所有private方法都隐式地指定为final的。

final类，说明该类不能被继承。final类的域可以根据个人意愿选择是或者不是final，但final类中所有的方法都隐式指定为final的。