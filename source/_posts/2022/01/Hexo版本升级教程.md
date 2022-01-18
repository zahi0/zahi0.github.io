---
title: Hexo版本升级教程
date: 2022-01-18 23:29:27
tags: Hexo升级
category: Hexo
index_img: banner/p24.webp
banner_img: banner/p24.webp
---

在重新搭建Hexo的时候，执行 `hexo d` 部署出现了以下错误

```shell
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
TypeError [ERR_INVALID_ARG_TYPE]: The "mode" argument must be integer. Received an instance of Object
    at copyFile (node:fs:2774:10)
    at tryCatcher (D:\workspace\hexo\myblog\node_modules\bluebird\js\release\util.js:16:23)
```

经过一番百度得知是hexo版本与nodejs版本不匹配导致 [Hexo--Node.js 版本限制](https://hexo.io/zh-cn/docs/#Node-js-版本限制)

<!--more-->

```shell
> hexo -v
hexo: 3.9.0
hexo-cli: 4.3.0
os: win32 10.0.22000
node: 16.13.2
v8: 9.4.146.24-node.14
uv: 1.42.0
zlib: 1.2.11
brotli: 1.0.9
ares: 1.18.1
modules: 93
nghttp2: 1.45.1
napi: 8
llhttp: 6.0.4
openssl: 1.1.1l+quic
cldr: 39.0
icu: 69.1
tz: 2021a
unicode: 13.0
ngtcp2: 0.1.0-DEV
nghttp3: 0.1.0-DEV
```

（不知道为什么使用 `npm install -g hexo-cli` 下载的hexo版本这么旧）

解决方法有两个，一个是降级nodejs，另一个是升级hexo版本，我选择的是后者，下面是操作过程

```shell
//以下指令均在博客目录下操作，先定位到博客目录
//查看当前版本，判断是否需要升级
> hexo v

//安装npm-check，若已安装可以跳过
> npm install -g npm-check

//检查系统插件是否需要升级
> npm-check

//安装npm-upgrade，若已安装可以跳过
> npm install -g npm-upgrade

//更新package.json
> npm-upgrade

//更新全局插件
> npm update -g

//更新系统插件
> npm update --save

//再次查看版本，判断是否升级成功
> hexo v
```

至此，就升级完成了。



PS：在升级完成后，使用hexo时遇到一个warn警告

```shell
WARN  Deprecated config detected: "external_link" with a Boolean value is deprecated. See https://hexo.io/docs/configuration for more details.
```

解决方法：在 _config.yml 里面搜索 external_link

```shell
external_link: true # Open external links in new tab
```

修改为：

```shell
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: '' # Open external links in new tab
```

