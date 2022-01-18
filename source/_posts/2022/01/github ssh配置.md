---
title: github ssh 配置
date: 2022-01-15 15:54:36
tags: [git,Github]
category: Git
index_img: banner/p23.webp
banner_img: banner/p23.webp
---


 在本地推代码到github的时候，要先配置一下ssh

 <!--more-->

## 生成ssh key
```bash
cd ~
ssh-keygen -t rsa -b 4096 -C "997798407@qq.com"
```
然后一路回车就行
```bash
cat .ssh/id_rsa.pub
```
把key复制好

## 在github配置ssh key
进入这个页面: https://github.com/settings/keys

点击 **new ssh key**,把上面复制的粘贴保存


## 设置username和email
```bash
git config --global user.name "github的username"
git config --global user.email "注册github的邮箱"
```

