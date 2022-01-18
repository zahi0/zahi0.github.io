---
title: Java基础知识——多态
date: 2019-10-08 14:52:09
tags: Java基础
category: Java
index_img: banner/p9.jpg
banner_img: banner/p9.jpg
---

 多态通过分离做什么和怎么做，从另一个角度将接口和实现分离开来。多态不仅能改善代码的组织结构和可读性，还能够创建可扩展的程序——即无论在项目最初创建时还是在需要添加新功能时都可以“生长”的程序。

<!--more-->

### 1、再论向上转型

```java
class Instrument {
	public void play(){
		System.out.println("Instrument.play()");
	}
}

class Wind extends Instrument{
	public void play(){
		System.out.println("Wind.play()");
	}
}

class Music{
    public static void tune(Instrument i){
        i.paly();
    }
    public static void main(String[] args){
        Wind flute = new Wind();  //甚至可以这样写：Instrument flute = new Wind();
        tune(flute);   //upcasting
    }
}
/*output:
Wind.play()
*/
```

如果让tune()方法直接接受一个wind引用作为自己的参数，似乎会更为直观。但是这样做就需要为Instrument的每个子类都编写一个新的tune()方法，这就需要更多的编程。把wind类型看做Instrument类型会使编程更简单，这正是多态所允许的。

### 2、转机

将一个方法调用和一个方法主体关联起来被称作绑定。若在程序执行前进行绑定，叫做前期绑定，它是面向过程语言的默认绑定方式。在运行时根据对象的类型进行绑定叫做后期绑定，也叫动态绑定或运行时绑定。Java中除了static方法和final方法（private方法属于final方法）之外，其他所有方法都是后期绑定。

一旦知道Java中所有方法都是通过动态绑定实现多态这个事实后，我们就可以编写只与父类打交道的代码了，并且这些代码对所有子类都可以正确运行。例如上面的代码中，tune()方法里的i.play()，看起来是调用Instrument的play方法，实际运行时却是调用了Wind的play方法，正时由于动态绑定（多态），才产生了正确的行为。

**可扩展性：**由于多态机制，我们可以根据需要添加任意多的继承自Instrument的新类型，而不需要更改tune方法，所有的新类型都能与原有类型一起正确运行。

**缺陷：“覆盖”私有方法。**下面写法并不会报错：

```java
public class PrivateOverride {
    private void f(){
        System.out.println("private f()");
    }
    public static void main(String[] args){
        PrivateOverride po = new Derived();
        po.f();
    }
}

class Derived extends PrivateOverride{
    public void f(){
        System.out.println("public f()");
    }
}
/* output:
private f()
*/
```

我们所期望的输出是public f()，但是由于private方法被自动认为是final方法，而且对于子类是屏蔽的，因此，在这种请况下，Derived类中的f()方法就是一个全新的方法。既然父类的f()方法在子类Derived中不可见，因此甚至不能被重载。结论是：只有非private方法才可以被覆盖。

**缺陷：域与静态方法。**域与静态方法不是多态的。只有普通方法是多态的。

``` java
public class Super {
    public int field = 0;
    public int getField(){
        return field;
    }
}

class Sub extends Super{
    public int field = 1;
    public int getField(){
        return field;
    }
    public int getSuperField(){
        return super.field;
    }
}

class FieldAccess{
    public static void main(String[] args){
        Super sup = new Sub();  //upcasting
        System.out.println("sup.field = " + sup.field + ", sup.getField() = " + sup.getField());
        Sub sub = new Sub();
        System.out.println("sub.field = " + sub.field + ", sub.getField() = " + sub.getField() + ", sub.getSuperField() = " + sub.getSuperField());
    }
}
/* output:
sup.field = 0, sup.getField() = 1  //域field是父类的域，方法getField是子类的方法，说明域不是多态的
sub.field = 1, sub.getField() = 1, sub.getSuperField() = 0
 */
```

### 3、构造器与多态

在构造器内部调用一个动态绑定的方法会出现意想不到的情况，在构造器内唯一能安全调用的是父类中的final方法。



向上转型是安全的，但会丢失一些信息。向下转型是不安全的，需要做类型转换。