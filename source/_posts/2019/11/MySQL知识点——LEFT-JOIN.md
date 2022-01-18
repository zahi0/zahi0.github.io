---
title: MySQL知识点——LEFT JOIN
date: 2019-11-25 10:31:29
tags: MySQL
category: MySQL
index_img: banner/p21.webp
banner_img: banner/p21.webp
---

left join on 即左连接，把left join左边的表的记录全部找出来，即使右边的表没有记录。

A LEFT JOIN B ON 条件表达式:

ON 条件用来决定如何从 B 表中检索数据行。

<!--more-->

如果 B 表中没有任何一行数据匹配 ON 的条件,将会额外生成一行所有列为 NULL 的数据。

在匹配阶段 WHERE 子句的条件都不会被使用。仅在匹配阶段完成以后，WHERE 子句条件才会被使用。它将从匹配阶段产生的数据中检索过滤。

SELECT * FROM A LEFT JOIN B ON A.ID=B.ID WHERE B.OTHERKEY=XXXX
与
SELECT * FROM A LEFT JOIN B ON A.ID=B.ID AND B.OTHERKEY=XXXX
是不一样的

后者相当于（出来的结果一样）
SELECT * FROM A LEFT JOIN B ON A.ID=B.ID WHERE B.OTHERKEY=XXXX OR B.OTHERKEY IS NULL

进行左连接时，就有涉及到主表、辅表，这时主表条件写在WHERE之后，辅表条件写在ON后面！！！