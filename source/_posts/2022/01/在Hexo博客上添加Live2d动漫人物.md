---
title: 在Hexo博客上添加Live2d动漫人物
tags: [Hexo,Live2d,动漫,花里胡哨]
hide: false
index_img: banner/p27.jpeg
banner_img: banner/p27.jpeg
date: 2022-01-21 20:40:52
updated:
category: Hexo
---

# 0、前言

想必大家经常能在一些博客的角落看到一个动漫人物（如下图右下角），并且可以用鼠标跟她进行互动，这个东西呢就叫做**Live2d**，今天就来说一下怎么在Hexo中添加Live2d人物。

<!--more-->

![](./在Hexo博客上添加Live2d动漫人物/image-20220121204439552.png)

# 1、安装 hexo-helper-live2d 模块

这个很简单，直接在你的博客根目录下执行

```shell
npm install --save hexo-helper-live2d
```

项目地址：[EYHN/hexo-helper-live2d: Add the Sseexxyyy live2d to your hexo! ](https://github.com/EYHN/hexo-helper-live2d)

# 2、下载Live2d人物模型

比如我要用上图这个小女孩的模型，执行以下命令

```shell
 npm install live2d-widget-model-shizuku
```

其他更多模型看这里：[xiazeyu/live2d-widget-models](https://github.com/xiazeyu/live2d-widget-models)

选择自己喜欢的下载

# 3、修改配置文件

在博客根目录下的 `_config.yml` 里面添加如下配置：（注意use字段改为自己下载的模型）

```yaml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-shizuku
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
  react:
    opacity: 0.7
```



最后

```shell
hexo g
hexo s
```

