---
title: MySQL知识点——时差函数
date: 2019-10-22 11:02:33
tags: MySQL函数
category: MySQL
index_img: banner/p18.webp
banner_img: banner/p18.webp
---

时间差函数TIMESTAMPDIFF、DATEDIFF的用法:

TIMESTAMPDIFF(unit,datetime_expr1,datetime_expr2)

该函数能计算两个时间datetime_expr1（小）、datetime_expr2（大）的差，并按照指定的单位unit输出（单位可以是时/分/秒/日/年）。例：

<!--more-->

```sql
select TIMESTAMPDIFF(HOUR,"2019-10-21 11:16:00",CURTIME())
# output: 24
select TIMESTAMPDIFF(DAY,"2019-01-01",CURDATE())
# output: 294
select TIMESTAMPDIFF(YEAR,"1996-10-22",CURDATE())
# output: 23
```

CURTIME()能获取当前时间，CURDATE()获取当前日期。



DATEDIFF(expr1,expr2)函数，返回值是相差的天数，不能定位到小时、分钟和秒。例：

```sql
select DATEDIFF(CURDATE(),"2020-01-01") as "距离下一个假期还有"
# output: -71
```

