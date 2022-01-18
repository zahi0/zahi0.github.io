---
title: 'Java:字节流和字符流（输入流和输出流）'
tags: [字节流, 字符流, 输入流, 输出流, IO]
hide: false
index_img: banner/p41.webp
banner_img: banner/p41.webp
date: 2022-04-02 15:29:37
updated:
category: Java
---

# 1、什么是流

- 流是个抽象的概念，是对输入输出设备的抽象，输入流可以看作一个输入通道，输出流可以看作一个输出通道。
- 输入流是相对程序而言的，外部传入数据给程序需要借助输入流。
- 输出流是相对程序而言的，程序把数据传输到外部需要借助输出流。

## 1.1 什么是字节流？

字节流--传输过程中，传输数据的最基本单位是<font color=red >**字节**</font>的流（也就是由0/1组成的流）。

## 1.2 什么是字符流？

字符流--传输过程中，传输数据的最基本单位是<font color=red >**字符**</font>的流（也就是由数字/字母/符号组成的流）。

## 1.3 字节和字符的关系

字符编码方式不同，有时候一个字符使用的字节数也不一样，比如ASCII方式编码的字符，占一个字节（1B，8bit）；而UTF-8方式编码的字符，一个英文字符需要一个字节，一个中文需要三个字节。

字节数据是二进制形式的，要转成我们能识别的正常字符，需要选择正确的编码方式。我们生活中遇到的乱码问题就是字节数据没有选择正确的编码方式来显示成字符。

从本质上来讲，写数据（即输出）的时候，字节也好，字符也好，本质上都是没有标识符的，需要去指定编码方式。

但读数据的时候，如果我们需要去“看数据”，那么字节流的数据需要指定字符编码方式，这样我们才能看到我们能识别的字符；而字符流，因为已经选择好了字符编码方式，通常不需要再改了（除非定义的字符编码方式与数据原有的编码方式不一致！）

在传输方面上，由于计算机的传输本质都是字节，而一个字符由多个字节组成，转成字节之前先要去查表转成字节，所以传输时有时候会使用缓冲区。

# 2、字节流

- 字节流的类通常以stream结尾

- InputStream、OutputStream

	- 处理字节流的抽象类
    - InputStream 是字节<font color=red >**输入流**</font>的所有类的超类，一般我们使用它的子类，如FileInputStream等
    - OutputStream是字节<font color=red >**输出流**</font>的所有类的超类，一般我们使用它的子类，如FileOutputStream等

## 2.1 字节输入流

常用的字节输入流主要有：

- InputStream 
- FileInputStream
- BufferedInputStream 【BufferedInputStream不是InputStream的直接实现子类，是FilterInputStream的子类】

### 2.1.1 他们的区别与用途

- InputStream 是字节输入流的抽象基类，InputStream作为基类，给它的基类定义了几个通用的函数：

  - read(byte[] b)：从流中读取b的长度个字节的数据存储到b中，返回结果是读取的字节个数（当再次读时，如果返回-1说明到了结尾，没有了数据）
    
  - read(byte[] b, int off, int len)：从流中从off的位置开始读取len个字节的数据存储到b中，返回结果是实际读取到的字节个数（当再次读时，如果返回-1说明到了结尾，没有了数据）
    
  - close()：关闭流，释放资源。

- FileInputStream 主要用来操作文件输入流，它除了可以使用基类定义的函数外，它还实现了基类的read()函数（无参的）：

  - read(): 从流中读取1个字节的数据，返回结果是一个int，（如果编码是以一个字节一个字符的，可以尝试转成char，用来查看数据）。

- BufferedInputStream 带有缓冲的意思，普通的读是从硬盘里面读，而带有缓冲区之后，BufferedInputStream已经提前将数据封装到内存中，内存中操作数据要快，所以它的效率要要非缓冲的要高。它除了可以使用基类定义的函数外，它还实现了基类的read()函数（无参的）：

  - read(): 从流中读取1个字节的数据，返回结果是一个int，（如果编码是以一个字节一个字符的，可以尝试转成char，用来查看数据）。

### 2.1.2 使用

- InputStream是抽象基类，所以它不可以创建对象，但它可以用来“接口化编程”，因为大部分子类的函数基类都有定义，所以利用基类来调用函数。

- FileInputStream是用来读文件数据的流，所以它需要一个文件对象用来实例化，这个文件可以是一个File对象,也可以是文件名路径字符串.【这里文件不存在会抛错】

  ```java
  public static void main(String[] args) {
          try {
              FileInputStream fis = new FileInputStream("D:/a.txt");  //使用文件路径实例化
  //            File file = new File("D:/a.txt");
  //            FileInputStream fis2 = new FileInputStream(file); //使用File对象实例化
              byte[] buff = new byte[1024];
              int len;
              while ((len = fis.read(buff)) != -1){
                  System.out.println(new String(buff, 0, len));
              }
              fis.close();
          } catch (Exception e) {
              System.out.println("读取文件出错");
          }
  }
  ```

  

- BufferedInputStream是一种封装别的流以提高效率的流，所以它的初始化需要一个的InputStream流对象。

  ```java
  public static void main(String[] args) {
          try {
              FileInputStream fis = new FileInputStream("D:/a.txt");  //使用文件路径实例化
              BufferedInputStream bis = new BufferedInputStream(fis);  //可用任意InputStream的对象实例化它
              byte[] buff = new byte[1024];
              int len;
              while ((len = bis.read(buff)) != -1){
                  System.out.println(new String(buff, 0, len));
              }
              bis.close();
              fis.close();
          } catch (Exception e) {
              System.out.println("读取文件出错");
          }
  }
  ```

## 2.2 字节输出流

常用的字节输出流主要有：

- OutputStream
- FileOutputStream
- BufferedOutputStream 【BufferedOutputStream不是OutputStream的直接实现子类，是FilterOutputStream的子类】

### 2.2.1 他们的区别与用途

- OutputStream是字节输出流的基类， OutputStream作为基类，给它的基类定义了几个通用的函数：

  - write(byte[] b):  将b的长度个字节数据写到输出流中。
  
  
    - write(byte[] b,int off,int len):  从b的off位置开始，获取len个字节数据，写到输出流中。
  
  
  
    - flush():  刷新输出流，把数据马上写到输出流中。
  
  
  
    - close():  关闭流，释放系统资源。
  


- FileOutputStream是用于写文件的输出流，它除了可以使用基类定义的函数外,还实现了OutputStream的抽象函数write(int b):

  - write(int b):  将b转成一个字节数据，写到输出流中。

- BufferedOutputStream像上面那个BufferedInputStream一样，都可以提高效率。它除了可以使用基类定义的函数外,它还实现了OutputStream的抽象函数write(int b):

  - write(int b):  将b转成一个字节数据，写到输出流中。

### 2.2.2 使用

- OutputStream是抽象基类，所以它不能实例化，但它可以用于接口化编程。
- FileOutputStream是用于写文件的输出流，所以它需要一个文件作为实例化参数，这个文件可以是File对象，也可以是文件路径字符串。【如果文件不存在，那么将自动创建。】【FileOutputStream实例化时可以给第二个参数，第二个参数是是否使用追加写入默认，为true时代表在原有文件内容后面追加写入数据，默认为false】

```java
public static void main(String[] args) {
        try {
            FileOutputStream fos = new FileOutputStream("D:/b.txt");
            fos.write("hello world".getBytes());
            fos.close();

            FileOutputStream fos2 = new FileOutputStream("D:/b.txt", true); //true在原文件后面追加内容，false覆盖原文件
            fos2.write("你好世界".getBytes());
            fos2.close();

        } catch (Exception e) {
            System.out.println("写入文件出错");
        }
    }
```

- BufferedOutputStream需要一个输出流作为实例化参数。

```java
   public static void main(String[] args) {
        try {
            FileOutputStream fos = new FileOutputStream("D:/b.txt");
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            bos.write("hello world".getBytes());
            bos.close();
            fos.close();
        } catch (Exception e) {
            System.out.println("写入文件出错");
        }
    }
```

# 3、字符流

- 字符流的类通常以reader和writer结尾

- Reader、Writer

  - 处理字符流的抽象类
  - Reader 是**字节流**通向**字符流**的桥梁，它将字节流转换为字符流.
  - Writer 是**字符流**通向**字节流**的桥梁，它将字符流转换为字节流.


## 3.1 字符输入流

常见的字符输入流有：

- Reader
- InputStreamReader
- FileReader
- BufferedReader

### 3.1.1 他们的区别与用途

- Reader 是字符输入流的抽象基类，它定义了以下几个函数：
  - read() ：读取单个字符，返回结果是一个int，需要转成char;到达流的末尾时，返回-1
  - read(char[] cbuf) :  读取cbuf的长度个字符到cbuf中，返回结果是读取的字符数，到达流的末尾时，返回-1
  - close() ：关闭流，释放占用的系统资源。
- InputStreamReader 可以把InputStream中的字节数据流根据字符编码方式转成字符数据流。它除了可以使用基类定义的函数，它自己还实现了以下函数：
  - read(char[] cbuf, int offset, int length) ：从offset位置开始，读取length个字符到cbuf中，返回结果是实际读取的字符数，到达流的末尾时，返回-1
- FileReader 可以把FileInputStream中的字节数据转成根据字符编码方式转成字符数据流。
- BufferedReader 可以把字符输入流进行封装，将数据进行缓冲，提高读取效率。它除了可以使用基类定义的函数，它自己还实现了以下函数：
  - read(char[] cbuf, int offset, int length) ：从offset位置开始，读取length个字符到cbuf中，返回结果是实际读取的字符数，到达流的末尾时，返回-1
  - **readLine()** ：读取一个文本行，以行结束符作为末尾，返回结果是读取的**字符串**。如果已到达流末尾，则返回 null。这个方法比较常用。

### 3.1.2 使用

- Reader 是一个抽象基类，不能实例化，但可以用于接口化编程。

- InputStreamReader需要一个字节输入流对象作为实例化参数。还可以指定第二个参数，第二个参数是字符编码方式，可以是编码方式的字符串形式，也可以是一个字符集对象。

  ```java
      public static void main(String[] args) {
          try {
              InputStreamReader isr = new InputStreamReader(new FileInputStream("D:/b.txt"));
              int ch;
              while ((ch = isr.read()) != -1){
                  System.out.println( (char)ch );
              }
              isr.close();
          } catch (Exception e) {
              System.out.println("读取文件出错");
          }
      }
  ```

- FileReader 需要一个文件对象作为实例化参数，可以是File类对象，也可以是文件的路径字符串。

  ```java
   public static void main(String[] args) {
          try {
              FileReader reader = new FileReader("D:/b.txt");
              char[] cbuf = new char[1024];
              int len;
              while ((len = reader.read(cbuf)) != -1){
                  System.out.println(new String(cbuf, 0, len));
              }
              reader.close();
          } catch (Exception e) {
              System.out.println("读取文件出错");
          }
      }
  ```

- BufferReader需要一个字符输入流对象作为实例化参数。

  ```java
      public static void main(String[] args) {
          try {
              FileReader reader = new FileReader("D:/b.txt");
              BufferedReader bufferedReader = new BufferedReader(reader);
              String line;
              while ( (line = bufferedReader.readLine()) != null){
                  System.out.println(line);
              }
              bufferedReader.close();
              reader.close();
          } catch (Exception e) {
              System.out.println("读取文件出错");
          }
      }
  ```

  ```java
     //这是推荐的获取标准输入流的方法（从控制台获取输入）
     BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
  ```

## 3.2 字符输出流

常见的字符输出流有：

- Writer
- OutputStreamWriter
- FileWriter
- BufferedWriter

### 3.2.1 他们的区别与用途

- Writer是字符输出流的抽象基类， ,它定义了以下几个函数

  - write(char[] cbuf) :往输出流写入一个字符数组。
  - write(int c) ：往输出流写入一个字符。
  - write(String str) ：往输出流写入一串字符串。
  - write(String str, int off, int len) :往输出流写入字符串的一部分。
  - close() ：关闭流，释放资源。 【这个还是抽象的，写出来是说明有这个关闭功能】
  - flush()：刷新输出流，把数据马上写到输出流中。 【这个还是抽象的，写出来是说明有这个关闭功能】

- OutputStreamWriter可以使我们直接往流中写字符串数据，它里面会帮我们根据字符编码方式来把字符数据转成字节数据再写给输出流，它相当于一个中介\桥梁。

- FileWriter与OutputStreamWriter功能类似，我们可以直接往流中写字符串数据，FileWriter内部会根据字符编码方式来把字符数据转成字节数据再写给输出流。

- BufferedWriter比FileWriter还高级一点，它利用了缓冲区来提高写的效率。它还多出了一个函数：

  - newLine() ：写入一个换行符。

### 3.2.3 使用

- Writer 是一个抽象基类，不能实例化，但可以用于接口化编程。
- OutputStreamWriter 需要一个输入流对象作为实例化参数。

```java
public static void main(String[] args) {
        try {
            OutputStream out = new FileOutputStream("D:/b.txt");
            OutputStreamWriter osw = new OutputStreamWriter(out);
            osw.write("你好啊");
            osw.close();
            out.close();
        } catch (Exception e) {
            System.out.println("写入文件出错");
        }
}
```

- FileWriter 需要一个文件对象来实例化，可以是File类对象，也可以是文件的路径字符串。

  ```java
   public static void main(String[] args) {
          try {
              FileWriter writer = new FileWriter("D:/b.txt");
              writer.write("雷猴啊");
              writer.close();
          } catch (Exception e) {
              System.out.println("写入文件出错");
          }
      }
  ```

- BufferWriter

  ```java
   public static void main(String[] args) {
          try {
              FileWriter writer = new FileWriter("D:/b.txt");
              BufferedWriter bufferedWriter = new BufferedWriter(writer);
              bufferedWriter.write("雷猴啊123456");
              bufferedWriter.newLine();
              bufferedWriter.write("hhhhhh");
              bufferedWriter.close();
              writer.close();
          } catch (Exception e) {
              System.out.println("写入文件出错");
          }
      }
  ```
  
  ```java
     //这是推荐的标准输出的方式（输出到控制台）
     Writer out = new BufferedWriter(new OutputStreamWriter(System.out));
  ```

# 4、补充

- 上面的一些函数，考虑到效率问题，上面的子类可能会重写基类的函数，但功能基本是不变的。
- 更多关于字节流的函数与用法可以参考jdk文档。

# 5、参考资料
https://www.cnblogs.com/progor/p/9357676.html
