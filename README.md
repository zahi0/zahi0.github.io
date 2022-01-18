> 此分支放的是博客源文件，master分支是Hexo生成的静态页面



# 搭建过程



1、安装nodejs [下载 | Node.js (nodejs.org)](https://nodejs.org/zh-cn/download/)

检查有没有成功

```shell
node -v
npm -v
```



2、安装Hexo

```shell
npm install -g hexo-cli
hexo -v #装完检查一下
```



3、克隆本仓库
克隆完成后，进入文件夹，该目录下有：

- node_modules: 依赖包
- public：存放生成的静态页面
- scaffolds：生成文章的一些模板
- source：用来存放你的文章
- themes：主题
- _config.yml: 博客的配置文件



4、cd 到该目录

```shell
npm install   #（可选）
```

然后执行以下命令

```shell
hexo g #生成静态网页
hexo server #启动服务器
```

服务器启动后，访问网址： http://localhost:4000/  浏览自己的博客

确认没问题之后，部署博客到Github page上，命令：

```shell
npm install hexo-deployer-git --save  #（可选）仅第一次部署需要，后续不要执行此命令
hexo d
```



*ps: 我在部署的时候出现问题，需要升级hexo版本，详细过程 [Hexo版本升级教程](https://zahi0.github.io/2022/01/18/Hexo版本升级教程/)*



5、Hexo相关命令[指令 | Hexo](https://hexo.io/zh-cn/docs/commands.html)



> 参考文章：[hexo史上最全搭建教程_Fangzh的技术博客-CSDN博客_hexo](https://blog.csdn.net/sinat_37781304/article/details/82729029)

