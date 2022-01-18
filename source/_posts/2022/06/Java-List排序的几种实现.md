---
title: Java List排序的几种实现
tags: [Java基础, 排序]
hide: false
index_img: banner/p45.png
banner_img: banner/p45.png
date: 2022-06-02 16:09:24
updated:
category: Java
---

排序对象类

<!--more-->

```java
public class Student{

    private String name;

    private Integer age;

    public Student(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public Student() {
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

## 方式一：实现Comparable接口

修改Student类实现Comparable接口 

```java
public class Student implements Comparable<Student>{

	......

    /**
     * 需要实现的方法，实现升序排序，降序请反写
     * this表示当前的对象
     * @param o 比较时传入的对象
     * @return
     */
    @Override
    public int compareTo(Student o) {
        return this.age - o.age;
    }
}
```

**关于compareTo方法**

- 返回值>0：表示当前对象比传入对象大
- 返回值=0：表示当前对象和传入对象一样大
- 返回值<0：表示当前对象比传入对象小

<br>

使用

```Java
public class Test {
    public static void main(String[] args) {
        //数据准备
        List<Student> list = new ArrayList<>();
        list.add(new Student("小明",1));
        list.add(new Student("小红",4));
        list.add(new Student("小刚",3));
        list.add(new Student("小鸡",5));
        list.add(new Student("小狗",2));
        //使用Collections集合工具类进行排序
        Collections.sort(list);
        for (Student student : list) {
            System.out.println(student);
        }
    }
}
```

## 方式二：使用Comparator接口

使用方式一我们必须在Student类上面进行修改，这显然不是最好的办法，如果我们不想按年龄排序，想要按照姓名排序，或者我们有一个方法需要按照年龄，另一个方法需要按照姓名，那么重写compareTo方法显然就没法完成我们的目标了，Collections的重载sort方法可以允许我们在排序对象外部自定义一个比较器（Comparator接口的实现类），因为我们仅需要实现compare（）方法，没必要在定义一个类，我们直接使用匿名内部类的方式。

此时的Student类我们不用进行任何改写，和最原始的一样即可

```Java
public class Test {
    public static void main(String[] args) {
        //数据准备
        List<Student> list = new ArrayList<>();
        list.add(new Student("小明",1));
        list.add(new Student("小红",4));
        list.add(new Student("小刚",3));
        list.add(new Student("小鸡",5));
        list.add(new Student("小狗",2));
        
        //使用Collections集合工具类进行排序
        Collections.sort(list, new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                //升序排序，降序反写
                return o1.getAge()-o2.getAge();
            }
        });

        for (Student student : list) {
            System.out.println(student);
        }
    }
}
```

除了Collections类的sort方法，我们还可以使用List类的sort方法

```Java
public static void main(String[] args) {
        //数据准备
        List<Student> list = new ArrayList<>();
        list.add(new Student("小明",1));
        list.add(new Student("小红",4));
        list.add(new Student("小刚",3));
        list.add(new Student("小鸡",5));
        list.add(new Student("小狗",2));

		//使用List类的sort方法，都是实现Comparator接口
        list.sort(new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                return o1.getAge()-o2.getAge();
            }
        });

        for (Student student : list) {
            System.out.println(student);
        }

    }
```

## 方式三：Lambda表达式

方式二相比，只改变了一行代码
将

```Java
Collections.sort(list, new Comparator<Student>() {

            @Override
            public int compare(Student o1, Student o2) {
                //升序排序，降序反写
                return o1.getAge()-o2.getAge();
            }

        });
```

变为：

```java
Collections.sort(list, (o1, o2) -> o1.getAge() - o2.getAge());
```

## 方式四：使用Comparator接口的静态方法

上文方式三

```java
Collections.sort(list, (o1, o2) -> o1.getAge() - o2.getAge());
```

可以变为：

```java
Collections.sort(list, Comparator.comparingInt(Student::getAge));
```

ps: 为什么接口可以有自己的实现方法呢，可以看这篇文章 [JAVA8新特性-接口也可以写实现方法](/2022/06/02/JAVA8新特性-接口也可以写实现方法/)

## 方式五：使用Stream流

```java
List<Student> students = list.stream().
                sorted((Comparator.comparingInt(Student::getAge)))
                .collect(Collectors.toList());
```



## PS：数组（Array）的排序

使用 Arrays.sort 方法
