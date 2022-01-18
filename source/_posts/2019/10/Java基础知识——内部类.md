---
title: Java基础知识——内部类
date: 2019-10-09 11:44:34
tags: Java基础
category: Java
index_img: banner/p12.jpg
banner_img: banner/p12.jpg
---

 可以将一个类的定义放在另一个类的内部，这就是内部类。内部类拥有其外部类的所有元素的访问权。

<!--more-->

如果要在内部类生成对外部类的引用，可以使用外部类的名字后面紧跟 **.this** ，例：

```java
public class Outer{
	public void f(){}
	
	class Inner{
		public Outer getOuter(){ return Outer.this; }
		public void outerF(){ Outer.this.f(); }
	}
}
```



要想在外部类的静态方法内或者其他类的任意地方直接创建内部类的对象，需要先创建外部类的对象，然后使用 **.new** 创建内部类对象。如果是静态内部类，那么就不需要对外部类对象的引用。例：

``` java
public class Outer {
    class Inner{}
    static class StaticInner{}
    public static void main(String[] args) {
        Outer o = new Outer();
//        Inner n = new Inner();   //error
        Inner i = o.new Inner();
        StaticInner s = new StaticInner();
    }
}

class Other{
    public void f(){
        Outer o = new Outer();
        Outer.Inner i = o.new Inner();
        Outer.StaticInner s = new Outer.StaticInner();
    }
}
```



# 局部内部类

定义在方法内部的类，在方法内部不能访问。也可以在作用域（如if作用域）内定义一个类，这个类仅在该作用域内可以访问。



# 匿名内部类

就是没有名字的类，它必须继承其他类或者实现一个接口。例：

```java
interface Content{
    void f();
}

public class Anonymous {
    
    public Content getContent(){
        return new Content() {  //插入一个类的定义
            @Override
            public void f() {
                System.out.println("anonymous class");
            }
        };  //return语句结束，要有分号
    }

    public static void main(String[] args){
        Anonymous a = new Anonymous();
        Content c = a.getContent();
        c.f();
    }
}
```

在getContent方法的return语句中，插入了一个匿名类的定义，该类实现了Content接口（虽然没有implements关键字），然后通过new关键字创建了一个匿名类的对象，把它的引用向上转型为Content的引用作为返回值。

在上面这个匿名内部类中，使用了默认的构造器来生成Content，如果你的父类需要一个有参数的构造器，可以看下面这个例子：

```java
class Wrapping{
    private String ss;
    Wrapping(String s){ ss = s; }
    public String f(){ return ss;}
}

public class Parcel {
    public Wrapping getWrapping(String s){
        return new Wrapping(s){
            public String f(){
                return super.f() + " world!";
            }
        };
    }

    public static void main(String[] args) {
        Parcel p = new Parcel();
        Wrapping w = p.getWrapping("hello");
        System.out.println(w.f()); //调用的是匿名内部类的f()
    }
}
```

在这个例子中匿名内部类继承了一个普通类Wrapping。

在匿名类中定义字段时，还可以对其执行初始化操作。如果在匿名类中使用一个在其外部定义的对象，那么编译器要求这个参数引用是final的。

匿名类中不可能有命名构造器（因为它根本没有名字！），但通过实例初始化，就能达到为匿名内部类创建一个构造器的效果。例：

```java
abstract class Base{
    public Base(int i){
        System.out.println("Base constructor. i = " + i);
    }
    public abstract void f();
}

public class AnonymousConstructor {
    public static Base getBase(int i){
        return new Base(i) {
            { System.out.println("inside instance initializer"); }  //实例初始化
            @Override
            public void f() {
                System.out.println("in anonymous f()");
            }
        };
    }

    public static void main(String[] args){
        Base base = getBase(11);
        base.f();
    }
}
```

在此例中，不要求变量i一定是final的，因为i被传递给匿名类的父类构造器，它并不会在匿名类内部直接使用。

对于匿名内部类而言，实例初始化的实际效果就是构造器，当然它受到了限制——你不能重载实例初始化方法，所以你仅有一个这样的构造器。



# 静态内部类

也叫嵌套类。普通内部类的对象隐式地保存了一个引用，指向创建它的外部类对象。然而静态内部类就不是这样了。静态内部类意味着：

（1）要创建静态内部类的对象，并不需要其外部类的对象。

（2）不能从静态内部类的对象中访问非静态的外围类对象。

静态内部类与普通内部类还有一个区别，普通内部类不能有static数据和static字段，也不能包含静态内部类。但是静态内部类可以包含所有这些东西。

在普通内部类中，通过一个this引用可以链接到其外部类对象。静态内部类就没有这个特殊的this引用，这使得它类似于一个static方法。



# 接口内部的类

正常情况下，不能在接口内部放置任何代码，但静态内部类可以作为接口的一部分。你放到接口中的任何类都自动的是public和static的。因为类是static的，只是将静态内部类置于接口的命名空间内，这并不违反接口的规则，你甚至可以在内部类中实现其外部接口。就像下面这样：

```java
public interface ClassInterface {
    void howdy();
    class Test implements ClassInterface{
        @Override
        public void howdy() {
            System.out.println("howdy!");
        }

        public static void main(String[] args) {
            new Test().howdy();
        }
    }
}
```

如果你要创建某些公共代码，使得它们可以被某个接口的所有不同实现所共用，那么使用接口的静态内部类就会显得很方便。



一个内部类被嵌套多少层并不重要，它能透明的访问它所嵌入的外部类的所有成员（即使是private的）。如下所示：

```java
public class MNA {
    private void f(){ System.out.println("first level");}
    class A{
        private void g(){System.out.println("second level");}
        class B{
            void h(){
                f();
                g();
                System.out.println("third level");
            }
        }
    }
}

class MultiNestingAccess{
    public static void main(String[] args) {
        MNA mna = new MNA();
        MNA.A a = mna.new A();
        MNA.A.B b = a.new B();
        b.h();
    }
}
```



为什么要使用内部类。内部类使得多重继承的解决方案变得完整，接口解决了部分问题，而内部类有效的实现了“多重继承”。当你拥有的是抽象类或具体类而不是接口时，你只能通过内部类实现多重继承。

内部类还可以获得其他一些特性：

（1）内部类可以有多个实例，每个实例都有自己的状态信息，并且与外围类对象的信息相互独立。

（2）在单个的外围类中，可以让多个内部类以不用的方式实现同一接口，或继承同一个类。

（3）创建内部类对象（这里大概是指静态内部类）的时刻并不依赖外围类对象的创建。

（4）内部类并没有令人迷惑的“is-a”关系；它就是一个独立的实体。

举个例子：

```java
import java.util.Random;

interface Selector{
    boolean end();
    Object current();
    void next();
}
public class Sequence{
    private Object[] objects;
    private int next = 0;
    public Sequence(int size){
        objects = new Object[size];
    }
    public void add(Object x){
        if(next < objects.length)
            objects[next++] = x;
    }
    private class SSelector implements Selector{
        private int  i = 0;
        public boolean end(){
            return i == objects.length;
        }
        public Object current(){
            return objects[i];
        }
        public void next(){
            if(i < objects.length)
                i++;
        }
    }
    private class ReverseSeletor implements Selector{
        private int i = objects.length-1;
        @Override
        public boolean end() {
            return i == -1;
        }

        @Override
        public Object current() {
            return objects[i];
        }

        @Override
        public void next() {
            if (i > -1){
                i--;
            }
        }
    }

    public Selector getSelector(){
        return new SSelector();
    }

    public Selector getReverseSeletor(){
        return new ReverseSeletor();
    }
    public static void main(String[] args){
        int size = 0;
        Sequence sequence = new Sequence(size);
        Random r = new Random();
        for(int i = 0; i < size; i++)
            sequence.add(Integer.toString(r.nextInt(47)));

        Selector selector = sequence.getSelector();
        while(!selector.end()){
            System.out.println(selector.current());
            selector.next();
        }
        System.out.println("================");

        Selector reSelector = sequence.getReverseSeletor();
        while(!reSelector.end()){
            System.out.println(reSelector.current());
            reSelector.next();
        }
    }
}
```

如果Sequence不使用内部类，就必须声明“Sequence是一个Selector”，对于某个特定的Sequence只能有一个Selector。然而使用内部类很容易就能拥有另一个方法getReverseSelector()，用它来生成一个反方向遍历序列的Selector。只有内部类才有这种灵活性。



# **闭包与回调**

闭包（closure）是一个可调用的对象，它记录了一些信息，这些信息来自于创建它的作用域。通过这个定义，可以看出内部类是面向对象的闭包。因为它不仅包含外围类对象（创建内部类的作用域）的信息，还自动拥有一个指向此外围对象的引用，在此作用域内，内部类有权操作所有的成员，包括“private”成员。

Java最具有争议的问题之一就是，人们认为Java应该包含某种类似指针的机制，以允许回调（callback）。通过回调，对象能够携带一些信息，这些信息允许它在稍后的某个时刻调用初始的对象。通过内部类提供闭包可以方便的实现回调功能，它比指针更灵活、更安全。

```java 
interface Teachable
{ void work(); }

class Programmer
{
    private String name;
    public Programmer(String name) { this.name = name; }
    public String getName() { return this.name; }
    public void work()
    { System.out.println(name + "在灯下认真敲键盘..."); }
}
/*
假如有一个人既是一个程序员又是一个教师，于是就需要一个特殊的类，
既需要实现Teachable接口，也需要继承Programmer父类。表面上看
起来没什么问题，问题是Teachable接口和Programmer父类里包含了
相同的work方法。这个时候，我们就可以通过一个仿闭包的内部类来实现这个功能。
 */
public class TeachableProgrammer extends Programmer
{
    public TeachableProgrammer(String name)
    { super(name); }
    //教学工作依然由TeachableProgrammer类定义
    private void teach()
    { System.out.println(getName() + "教师在讲台上讲解..."); }
    private class Closure implements Teachable
    {
        /*
        非静态内部类回调外部类实现work方法，非静态内部类引用的作用仅仅是
        向客户类提供一个回调外部类的途径
        */
        public void work()
        {
            teach();
        }
    }
    //返回一个非静态内部类引用，允许外部类通过该非静态内部类引用来回调外部类的方法
    public Teachable getCallbackReference()
    {
        return new Closure();
    }
}
//下面程序示范了如何让让TeachableProgrammer对象既执行“教学”的work方法，也执行“编程”的work方法。
 class TeachableProgrammerTest
{
    public static void main(String[] args)
    {
        TeachableProgrammer tp = new TeachableProgrammer("李刚");
        //直接调用TeachableProgrammer类从Programmer类继承到的work方法
        tp.work();
        //表面上调用的是Closure的work方法，
        //实际上是回调TeachableProgrammer的teach方法
        tp.getCallbackReference().work();
    }
}
```



# **内部类的继承**

因为内部类的构造器必须连接到指向其外部类对象的引用，所以在继承内部类的时候，事情会变得有点复杂。举个例子：

``` java
public class WithInner {
    class Inner{}
}

class InheritInner extends WithInner.Inner {
    InheritInner(WithInner wi){
        wi.super();  //必须调用外围类的构造器
    }
    public static void main(String[] args) {
        WithInner wi = new WithInner();
        InheritInner ii = new InheritInner(wi);
    }
}
```

可以看到，InheritInner只继承自内部类，而不是外围类，但是在写构造器时，必须提供一个指向外围类对象的引用。



如果创建一个内部类，然后继承其外围类并重新定义此内部类时，会发生什么呢？也就是说，内部类可以被覆盖吗？答案是不能，因为这两个内部类是完全独立的两个实体，各自在自己的命名空间内。



前面提到过，可以在代码块里创建内部类，典型的方式是在一个方法体里面创建。局部内部类不能有访问说明符（就是public，private这些），因为它不是外围类的一部分，但是它可以访问当前代码块内的常量，以及此外围类的所有成员。下面的例子对局部内部类与匿名内部类的创建进行了比较。

``` java
interface Counter{
    int next();
}

public class LocalInnerClass {
    private int count = 0;
    Counter getCounter(final String name){
        class LocalCounter implements Counter{
            public LocalCounter(){   //局部内部类可以有构造器
                System.out.println("LocalCounter()");
            }
            public int next(){
                System.out.print(name); //访问局部常量
                return count++;  //访问外围类的成员
            }
        }
        return new LocalCounter();
    }
    Counter getCounter2(final String name){
        return new Counter() {
            {   //匿名内部类不能有带名字的构造器，只能有一个实例初始化代码块
                System.out.println("Counter()");
            }
            @Override
            public int next() {
                System.out.print(name);
                return count++;
            }
        };
    }

    public static void main(String[] args) {
        LocalInnerClass lic = new LocalInnerClass();
        Counter
                c1 = lic.getCounter("local inner class"),
                c2 = lic.getCounter2("anonymous inner class");
        for ( int i = 0; i < 5; i++){
            System.out.println(" " + c1.next());
        }
        for ( int i = 0; i < 5; i++){
            System.out.println(" " + c2.next());
        }
    }
}
/* output:
LocalCounter()
Counter()
local inner class 0
local inner class 1
local inner class 2
local inner class 3
local inner class 4
anonymous inner class 5
anonymous inner class 6
anonymous inner class 7
anonymous inner class 8
anonymous inner class 9
 */
```

可以看到两个内部类对象的计数是连续的，因为它们是同一个外围类对象创建的，访问的是同一个count变量。既然局部内部类的名字在方法外不可见，那么我们为什么仍然要使用局部内部类而不是匿名内部类呢？唯一的理由是，我们需要一个已命名的构造器，或者需要重载构造器。