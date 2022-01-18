---
title: Java基础知识——类型信息
date: 2019-10-16 10:16:51
tags: Java基础
category: Java
index_img: banner/p11.jpg
banner_img: banner/p11.jpg
---

# 1、为什么需要RTTI

RTTI的含义：在运行时，识别一个对象的类型。

<!--more-->

# 2、Class对象

Class对象包含了与类有关的信息，每个类都有一个Class对象。换言之，每当编写并且编译了一个新类，就会产生一个Class对象。为了生成这个对象，使用了jvm中的类加载器。

所有类都是对其第一次使用时，动态加载到jvm中，当程序创建第一个对类的静态成员的引用时，就会加载这个类，这证明构造器也是类的静态方法，因此，使用new创建类的新对象也会被当做对类静态成员的引用。

类加载器先检查这个类的Class对象是否已经加载，如尚未加载，默认的类加载器就会根据类名查找.class文件。在这个类的字节码被加载时，它们会接受验证，以确保其没有被破坏，并且不包含不良的Java代码（这是java中用于安全防范目的的措施之一）。

一旦某个类的Class对象被载入内存，它就被用来创建这个类的所有对象。例：

```java
class Candy{
    static {
        System.out.println("Candy");
    }
}
class Gum{
    static {
        System.out.println("Gum");
    }
}
class Cookie{
    static {
        System.out.println("Cookie");
    }
}
public class SweetShop {
    public static void main(String[] args) {
        System.out.println("In main");
        new Candy();
        System.out.println("After create Candy");
        try{
            Class.forName("Gum");
        } catch (ClassNotFoundException e) {
            System.out.println("Couldn't find Gum");
        }
        System.out.println("Aftet Class.forName(\"Gum\")");
        new Cookie();
        System.out.println("After create Cookie");
    }
}
/* output:
In main
Candy
After create Candy
Gum
Aftet Class.forName("Gum")
Cookie
After create Cookie
*/
```

从输出结果可以看到，Class对象仅在需要的时候才会加载，static初始化也是在类加载时进行的。

Class.forName()方法是Class类（所有Class对象都属于Class类）的一个static成员，它是取得Class对象引用的一种方法（这里忽略了返回值），它接受一个类名作为输入。这里对forName的调用是为了它的副作用：如果Gum类还没有被加载就加载它。使用forName的好处是，你不需要为了得到Class对象的引用而创建该类型的对象。但是如果你已经有一个对象，你可以通过getClass方法来获取Class引用，该方法属于Object的一部分。

Class包含很多有用的方法，下面是其中的一部分：

```java
package test;

interface HasBatteries{}
interface Waterproof{}
interface Shoots{}
class Toy{
    Toy(){}
    Toy(int i){}
}
class FancyToy extends Toy implements HasBatteries,Waterproof,Shoots{
    FancyToy(){ super(1); }
}
public class TyoTest {
    static void printInfo(Class c){
        //getName()返回全限定类名（包括包名）， isInterface()判断是否接口
        System.out.println("Class name: " + c.getName() + " is interface? [" + c.isInterface() + "]");
        //getSimpleName()返回类名
        System.out.println("Simple name: " +c.getSimpleName());
        //getCanonicalName()返回全限定类名（包括包名，Java SE5中引入）
        System.out.println("Canonical name: " + c.getCanonicalName());
    }

    public static void main(String[] args) {
        Class c = null;
        try{
            c = Class.forName("test.FancyToy"); //必须使用全限定名
        } catch (ClassNotFoundException e) {
            System.out.println("Can't find FancyToy");
            System.exit(1);
        }
        printInfo(c);
        for (Class face:c.getInterfaces()){ //getInterfaces()返回所实现的全部接口的Class对象引用
            printInfo(face);
        }
        Class up = c.getSuperclass(); //getSuperclass()返回父类的Class对象引用
        Object obj = null;
        try {
            //newInstance()虚拟构造器，创建一个该类型的对象，该类必须有默认构造器
            obj = up.newInstance();
        } catch (IllegalAccessException e) {
            System.out.println("Can't access");
            System.exit(1);
        } catch (InstantiationException e) {
            System.out.println("Can't instantiate");
            System.exit(1);
        }
        printInfo(obj.getClass());
    }
}
```

Java还提供另一种方法来生成对Class对象的引用，即使用**类字面常量**。例：

```java
Class c = FancyToy.class
```

这样做不仅更简单，而且更安全，因为它在编译时就收到检查（因此不需要置于try语句块中）。类字面常量不仅可以应用于普通类，而且可以应用于接口、数组以及基本数据类型。另外，对于基本数据类型的包装类，还有一个标准字段TYPE，TYPE字段是一个引用，指向对应的基本数据类型的Class对象，例：

```java
int.class == Integer.TYPE;	//true
```

注意！！！当使用.class来创建Class对象的引用时，不会自动地初始化该Class对象（这和forName方法创建Class对象时不同），为了使用类而做的准备实际包含三个步骤：

（1）加载。这由类加载器执行，该步骤将查找字节码，并从这些字节码创建一个Class对象。

（2）链接。验证类中的字节码，为静态域分配存储空间，并且如果必须的话，将解析这个类创建的对其他类的所有引用。

（3）初始化。如果该类具有父类，则对其初始化，执行静态初始化器和静态初始化块。

初始化被延迟到对静态方法（包括构造器）或者非常数静态域进行首次引用时才执行。例：

```java
class Initable{
    static final int staticFinal = 47;
    static final int staticFinal2 = ClassInitialization.ran.nextInt(1000);
    static { System.out.println("Initializing initable"); }
}
class Initable2{
    static int staticNonFinal = 147;
    static { System.out.println("Initializing initable2"); }
}
public class ClassInitialization {
    public static Random ran = new Random(47);
    public static void main(String[] args) {
        Class initable = Initable.class;
        System.out.println("After creating Initable ref");
        System.out.println(Initable.staticFinal);
        System.out.println(Initable.staticFinal2);
        System.out.println("===================");
        System.out.println(Initable2.staticNonFinal);
    }
}
/* output:
After creating Initable ref
47
Initializing initable
258
===================
Initializing initable2
147
*/
```

如果一个static final值是“编译期常量”，就像Initable.staticFinal那样，那么这个值不需要对Initable类进行初始化就可以访问。但是，仅仅将一个域设置为static和final还不足以确保这种行为，例如Initable.staticFinal2的访问就会强制进行类的初始化，因为它不是一个编译期常量。

如果一个static域不是final的，那么对它访问时，要先进行链接和初始化，就像对Initable2.staticNonFinal的访问中所看到的那样。

Class\<T>  和Class\<?>的区别：Class\<T>的对象引用只能指向T类的Class对象，而Class\<?>没有限制，和Class等价。Class\<?>对于Class的好处是它表示你不是因为碰巧或疏忽而使用了一个不同类型的对象（Class引用表示的就是它所指向的对象的确切类型，它可以制造类的实例，一般来说给Class引用赋值后就不要改变它，或者使用Class\<T>来进行限制，如果要把引用指向其它类(非原先类的子类)，最好用Class<?>）。

# 3、类型转换前先做检查

RTTI形式包括：

（1）传统的类型转换，如“(Shape)”，由RTTI保证类型转换的正确性，如果执行了一个错误的类型转换，则抛出一个ClassCastException异常。

（2）代表对象类型的Class对象。通过查询Class对象可以获取运行时所需的信息。

（3）关键字instanceof，它返回一个布尔值，告诉我们对象是不是某个特定类型的实例。可以用提问的方式使用它，例：

```java
if(x instanceof Dog)
	((Dog) x).bark();
```

在将x转型为一个Dog前，先用if语句检查x是否从属于Dog类。

动态instanceof：class.isInstance(obj)方法提供了一种动态测试对象的途径，即对象obj能否转化为class所指向的类的对象。例：

```java
public class Pet {
    public static void main(String[] args) {
        Class c = Pet.class;
        Dog dog = new Dog();
        System.out.println(c.isInstance(dog));	//true
    }
}
class Dog extends Pet{}
```

对obj.instanceof(class)，在编译时编译器需要知道类的具体类型

对class.isInstance(obj)，编译器在运行时才进行类型检查，故可用于反射，泛型中

# 4、反射：运行时的类信息

Class类与java.lang.reflect类库一起对反射的概念进行了支持，该类库包含了......  //TODO