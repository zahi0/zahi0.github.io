---
title: git多人协作情景下本地分支推送到远程分支
date: 2019-12-06 15:54:36
tags: [git]
category: Git
index_img: banner/p22.webp
banner_img: banner/p22.webp
---

 场景：在公司开发，一般都是多人协作的情景，git上的分支也有master、ver、dev、Feature_1206_XXX......之类的，假设我把某个Feature分支拉到本地，修改并commit之后，另一个同事已经提交了几个commit并且push到了远程分支，这时我直接push是不行的，要先经过以下几个步骤：

<!--more-->

第一步：

``` 
git add XXX
git commit -m XXX
#只提交自己的代码，有时候不得已要修改别人的代码，但又不想提交，那就不要add进去
```

第二步：

```
git stash   
#把没有commit的修改保存至堆栈中
```

第三步：

```
git pull --rebase
#从远程分支拉取最新的代码，并把你的commit放在最后面
```

第四步：

```
git push
#推送你的代码到远程分支
git stash pop
#将当前stash中的内容弹出，把没有commit的modified文件恢复到工作区
```

