---
title: 申请免费域名并绑定到Github Page
date: 2022-01-19 16:57:33
tags: [Hexo,域名,DNS,Freenom]
category: Hexo
index_img: banner/p26.webp
banner_img: banner/p26.webp
---

在Github Page上搭建完博客之后，发现博客的域名有点长，不是很满意，所以想着搞一个自己的域名。经过一番网上冲浪之后，发现可以在[Freenom](http://www.freenom.com/zh/index.html)上白嫖一个免费的顶级域名，freenom 提供了tk、ml、ga、cf、gq这几个后缀的免费域名。下面主要介绍 freenom 免费域名的申请过程及设置域名解析。

<!--more-->



# 0、安装浏览器插件

首先安装一个非常实用的浏览器插件，iGG谷歌学术助手（我的浏览器是Edge，其他浏览器同理）

![image-20220119171437974](./申请免费域名并绑定到Github-Page/image-20220119171437974.png)

使用它可以访问Google、Gmail等服务，而且装上它之后访问freenom官网的速度快了很多，其他的功能大家就自己探索吧。

添加这个插件之后会提示用邮箱登录，用QQ邮箱直接登录就行。

# 1、申请免费域名

访问[Freenom](https://www.freenom.com/zh/index.html?lang=zh)官网，输入自己想要的域名，点击检测可用性

![image-20220119172951872](./申请免费域名并绑定到Github-Page/image-20220119172951872.png)

选择免费的，点击现在获取

![image-20220119173335712](./申请免费域名并绑定到Github-Page/image-20220119173335712.png)



如果点击了之后显示不可用，可以直接带后缀搜索，这样会直接加入购物车

![image-20220119214116257](./申请免费域名并绑定到Github-Page/image-20220119214116257.png)

到下一个页面，选择12个月

![image-20220119214342583](./申请免费域名并绑定到Github-Page/image-20220119214342583.png)

点击Continue，进入如下页面

![image-20220119214500864](./申请免费域名并绑定到Github-Page/image-20220119214500864.png)

如果有谷歌或Facebook账号可以直接登录，这里我选择输入邮箱

然后会收到一个邮件，点击邮件里面的连接，填写如下信息，重点：国家和省份要和IP地址的归属地一致，复制下方的IP（这是你的外网IP）到[这个网站](https://www.ip138.com/)查询IP归属地

![image-20220119220118207](./申请免费域名并绑定到Github-Page/image-20220119220118207.png)

填完之后点击Complete Order，出现如下页面，说明申请成功了。

![image-20220119220201679](./申请免费域名并绑定到Github-Page/image-20220119220201679.png)

PS：如果这个页面有如下信息：`Attention! Some of your domains could not be registered because of a technical error. These domains have been cancelled` 说明域名注册失败，原因是国家/省份和IP地址归属地不匹配，到个人信息里面修改即可。



点击Services--My Domains查看自己的域名

![image-20220119221920491](./申请免费域名并绑定到Github-Page/image-20220119221920491.png)

# 2、DNS域名解析设置

点击Manage Domain

![image-20220119222418995](./申请免费域名并绑定到Github-Page/image-20220119222418995.png)

选择Nameservers

![image-20220119222519130](./申请免费域名并绑定到Github-Page/image-20220119222519130.png)

选择Use custom nameservers，填入下面两个地址，最后点击Change Nameservers

`RAINFALL.DNSPOD.NET`

`SUN.DNSPOD.NET`

![image-20220119222730058](./申请免费域名并绑定到Github-Page/image-20220119222730058.png)

上述操作的意思是，不使用freenom的默认DNS，而是授权给DNSpod来处理域名解析



进入[DNSPOD](https://www.dnspod.cn/login)，直接微信扫码登录

点击左侧 我的域名，然后添加域名

![image-20220119223340835](./申请免费域名并绑定到Github-Page/image-20220119223340835.png)

输入我们的域名后，点击确认

![image-20220119223523873](./申请免费域名并绑定到Github-Page/image-20220119223523873.png)

点击这个域名

![image-20220119223623892](./申请免费域名并绑定到Github-Page/image-20220119223623892.png)

添加记录

![image-20220119223712237](./申请免费域名并绑定到Github-Page/image-20220119223712237.png)

填写如下内容，点击确认

![image-20220119224749272](./申请免费域名并绑定到Github-Page/image-20220119224749272.png)

其中的IP地址来自  `ping 你的账号.github.io`

![image-20220119224925938](./申请免费域名并绑定到Github-Page/image-20220119224925938.png)

最后到项目里 settings-->Pages-->Custom domain 输入你的域名保存就好啦。

![image-20220119224411849](./申请免费域名并绑定到Github-Page/image-20220119224411849.png)

在浏览器输入你的域名，enjoy！
