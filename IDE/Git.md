# Git


[[toc]]



## flag

* [https://gitlab.com/xhang/gitlab/wikis/home](https://gitlab.com/xhang/gitlab/wikis/home)

* [https://hub.docker.com/r/twang2218/gitlab-ce-zh](https://hub.docker.com/r/twang2218/gitlab-ce-zh)
[https://github.com/twang2218/gitlab-ce-zh](https://github.com/twang2218/gitlab-ce-zh)

* [https://github.com/gogs/gogs](https://github.com/gogs/gogs)

* [https://github.com/go-gitea/gitea](https://github.com/go-gitea/gitea)

* [https://github.com/gitblit/gitblit](https://github.com/gitblit/gitblit)

* [https://tortoisegit.org/download](https://tortoisegit.org/download)

* [https://github.com/toptal/gitignore.io](https://github.com/toptal/gitignore.io)


* [https://github.com/carloscuesta/gitmoji](https://github.com/carloscuesta/gitmoji)

* [Github 上 emoji 表情的含义及使用规范](https://mkblog.cn/872)

* [https://github.com/gitextensions/gitextensions](https://github.com/gitextensions/gitextensions)


## 安装最新版

* [https://git-scm.com/download](https://git-scm.com/download)


- 方式一

```bash
yum install -y http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
# 或者
wget http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
rpm -ivh wandisco-git-release-7-2.noarch.rpm
```

- 方式二

```bash
curl https://setup.ius.io | sh
# 或者
yum install -y epel-release  
rpm -ivh https://centos7.iuscommunity.org/ius-release.rpm
# 查看git包版本
yum list git2u
# 安装
yum -y install git2u
```


## 使用命令

### 把空文件夹提交到仓库

> 这个只能说是技巧不能说是方法，原理是在每个空文件夹新建一个.gitignore文件

```bash
find . -type d -empty -exec touch {}/.gitignore \;
```

### 更换项目远程地址

> 见`项目目录/.git/config`中的`remote`节点

> `origin`为默认远程节点名，可以自定义

- 查看当前的远程地址

```bash
git remote -v
```

- 删除`origin`节点的远程地址

```bash
git remote rm origin
# 或者
git remote remove origin
```

- 为`origin`节点添加远程地址

```bash
git remote add origin 远程地址
```

- 修改`origin`节点远程地址

```bash
git remote set-url origin 远程地址
```

- 为`origin`节点增加一个远程地址

> 可同时拉取或推送到多个远程地址

```bash
git remote set-url --add origin 远程地址
```

- 把当前分支与`origin`节点远程分支进行关联

```bash
git push --set-upstream origin 分支名称
```


### 未push之前更改提交

> 如果提交了代码到本地，还没push，发现同步时提交的变更内容的注释填写有误。

```bash
# 查看提交文件，里面包含注释和变更内容
git commit --amend
# 按v进入编辑模式，更改完成后按esc然后输入:qw! 保存
```

### 强制push本地仓库到远程

> 这种情况不会进行merge, 强制push后远程文件可能会丢失,不建议使用此方法

```bash
# 将本地仓库文件push到远程仓库（-f代表强制）
git push -u -f origin master
```

### pull强制覆盖本地文件

> 如果有任何本地更改，将会丢失。无论是否有--hard选项，任何未被推送的本地提交都将丢失。
> 如果您有任何未被Git跟踪的文件(例如上传的用户内容)，这些文件将不会受到影响。

- 在重置之前可以通过从master创建一个分支来维护当前的本地提交

```bash
git checkout master
git branch new-branch
```

> 在此之后，所有旧的提交都将保存在`new-branch`中。然而，没有提交的更改(即使staged)将会丢失。确保存储和提交任何你需要的东西。

- 执行重置

```bash
# 从远程下载最新的，而不尝试合并或rebase任何东西
git fetch --all
# reset将主分支重置为您刚刚获取的内容。
# --hard选项更改工作树中的所有文件以匹配origin/<branch_name>中的文件
git reset --hard origin/<branch_name>
```

```bash
# reset将主分支重置为您刚刚获取的内容。
# --hard选项更改工作树中的所有文件以匹配origin/<branch_name>中的文件
git reset --hard origin/<branch_name>
# 拉取远端最新代码
git pull
```


### 清除用户名密码

```bash
git config --system --unset credential.helper
```

### git恢复指定文件到指定版本

- 查看commit历史，并复制需要回退版本的hash

```bash
git log 文件名
```

- 恢复

```bash
git checkout 复制的hash值 文件名
```

### 统计

- 查看git上的个人代码量

```bash
git log --author="用户名" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

- 统计每个人增删行数

```bash
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

- 查看仓库提交者排名前五

```bash
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5
```

- 贡献值统计

```bash
git log --pretty='%aN' | sort -u | wc -l
```

- 提交数统计

```bash
git log --oneline | wc -l
```

- 添加或修改的代码行数

```bash
git log --stat|perl -ne 'END { print $c } $c += $1 if /(\d+) insertions/'
```

- 比较远端和本地分支

```bash
git diff master origin/master
```

- 统计文件的改动

```bash
git diff --stat master origin/master
# 执行一次git fetch origin xxx，那当下最新版本的commit会存在FETCH_HEAD中
git diff HEAD FETCH_HEAD

git pull --dry-run | grep -q -v 'Already up-to-date.' && changed=1
git log HEAD...origin/master --oneline
git log -p master..origin/master
```

- 本地与远程的差集

> 显示远程有而本地没有的`commit`信息

```bash
git log master..origin/master
```


### 保存用户密码

> 

```bash
git config --global --edit
# 设置项目个人邮箱
git config --global user.email "your email"
# 设置项目个人用户名
git config --global user.name  "your username"
# 永久保存凭证
git config --global credential.helper store
```

> 在`~/.gitconfig`中会自动在`[credential]`节点下添加`helper = store`

> 保存的账户密码在`~/.git-credentials`中



### 分支

- 查看本地分支`git branch`

- 查看远程分支`git branch -r`

- 查看所有分支`git branch -a`

- 本地创建新的分支`git branch [branch name]`

- 切换到新的分支`git checkout [branch name]`

- 创建+切换分支`git checkout -b [branch name]`

- 推送到指定分支`git push origin [branch name]`

- 删除本地分支`git branch -d [branch name]`

- 删除远程分支,分支名前的冒号代表删除`git push origin :[branch name]`



## 常见问题


### 项目过大clone报错

[https://vnzmi.com/2017/01/08/git-early-eof-index-pack-failed](https://vnzmi.com/2017/01/08/git-early-eof-index-pack-failed)

- 由于提交了比较大的文件，在服务端一直无法拉下来，错误如下

```diff
Cloning into 'E:\soft'...
POST git-upload-pack (175 bytes)
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (6/6), done.
fatal: early EOF
fatal: the remote end hung up unexpectedly
fatal: index-pack failed
```

- 执行命令

```bash
# 修改压缩的程度
git config --global core.compression 0

# 解决内存不够问题
git config --global pack.deltaCacheSize 2047m
git config --global pack.packSizeLimit 2047m
git config --global pack.windowMemory 2047m
git config --global core.packedGitWindowSize 512m
git config --global core.packedGitLimit 512m

# 调整缓存大小（单位为字节）为1G
git config --global http.postBuffer 1073741824

# 最低速度限制
git config --global http.lowSpeedLimit 0
# 最低速度时间
git config --global http.lowSpeedTime 999999
```
> compression 是压缩的意思，从 clone 的终端输出就知道，服务器会压缩目标文件，然后传输到客户端，客户端再解压。
取值为 [-1, 9]，-1 以 zlib 为默认压缩库，0 表示不进行压缩，1..9 是压缩速度与最终获得文件大小的不同程度的权衡，数字越大，压缩越慢，当然得到的文件会越小。

### 提交本地文件失败

> 在github远程创建仓库后, 利用gitbash进行提交本地文件的时候出现如下错误

```diff
[root@foundation38 demo]# git push -u origin master
Username for 'https://github.com': woytu
Password for 'https://woytu@github.com': 
To https://github.com/woytu/test.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/woytu/test.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')
hint: before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

- 第一种：进行push前先将远程仓库pull到本地仓库

```bash
# git pull --rebase origin master
git pull origin master
git push -u origin master

```

- 第二种：强制push本地仓库到远程

```bash
git push -u origin master -f
```

- 第三种：避开解决冲突, 将本地文件暂时提交到远程新建的分支中

```bash
git branch [name]
# 创建完branch后, 再进行push
git push -u origin [name] 
```

### 远端与本地代码冲突

- 先将本地修改存储起来

```bash
# 暂存修改,这样本地的所有修改就都被暂时存储起来
git stash
# 看到保存的信息,其中stash@{0}就是刚才保存的标记。
git stash list
```

- 暂存了本地修改之后，pull内容

- 还原暂存的内容

```bash
git stash popstash@{0}
```

- 系统提示如下类似的信息

```diff
Auto-mergingc/environ.c
CONFLICT(content): Merge conflict in c/environ.c
```

> 意思就是系统自动合并修改的内容，但是其中有冲突，需要解决其中的冲突。

- 解决文件中冲突的的部分

> 打开冲突的文件，其中`Updatedupstream` 和`=====`之间的内容就是pull下来的内容，`====`和`stashed changes`之间的内容就是本地修改的内容。
碰到这种情况，git也不知道哪行内容是需要的，所以要自行确定需要的内容。


### SSL验证错误

- 报错 `unable to access 'https://github.com/': OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443`

- 关闭SSL验证

```bash
env GIT_SSL_NO_VERIFY=true
# 或者
git config --global http.sslVerify false
```

- 去掉代理

```bash
git config --global --unset http.proxy
```





## 批量更新本地项目

### Windows

```batch
@echo off
:: 遍历当前目录下的子目录
for /f "delims=" %%i in ('dir /ad/b') do (
    :: 切换到子目录
    cd %%i
    :: 判断文件夹是否存在
    if exist ".git" (
        :: 列出远程仓库地址
        git remote -v
        echo ******** 开始更新 %%i **********
        :: 更新
        git pull
        echo -----------------------------------------------------------
    )
    cd ..
)

pause
```

### Linux

```bash
#!/bin/bash
function readdir() {
    # awk中有RS,ORS,FS,OFS 4个可以定义分隔符的变量
    # 保存原有的IFS（内部域分隔符）
    SAVEIFS=$IFS
    # 设置带有空格的文件名的处理方式
    IFS=$(echo -en "\n\b")
    # 切换到指定目录
    cd $*
    # 循环参数中指定目录的子目录
    for file in $(ls -F | grep /$); do
        # 切换到子目录
        cd $file
        # 设置执行结果变量
        dir_variable=$?
        # 如果切换到子目录失败
        if [ "$dir_variable" != "0" ]; then
            echo $dir_variable
            echo $*$file
        fi
        # 判断是否是git项目
        if [ -d ".git" ]; then
            # 列出git远端仓库路径
            git remote -v
            echo 开始更新： $file
            git pull
            echo -----------------------------------------------------------
        fi
        cd ..
        # 循环当前子目录下的子目录
        #readdir $1$file
    done
    # 恢复原有的IFS
    IFS=$SAVEIFS
}
# 调用shell函数并传参
readdir $(pwd)

```

## Git服务器

### GitLab

[https://hub.docker.com/r/bensonfx/gitlab-ce-zh](https://hub.docker.com/r/bensonfx/gitlab-ce-zh)

[https://github.com/bensonfx/codeserver](https://github.com/bensonfx/codeserver)

[https://hub.docker.com/r/benyoo/gitlab](https://hub.docker.com/r/benyoo/gitlab)

[https://hub.docker.com/r/imleafz/gitlab-ce-zh](https://hub.docker.com/r/imleafz/gitlab-ce-zh)

[GitLab Community Edition (中文社区版)](https://github.com/twang2218/gitlab-ce-zh)

[汉化的 GitLab 社区版 Docker Image ](https://hub.docker.com/r/twang2218/gitlab-ce-zh)
```bash
version: '2'
services:
    gitlab:
      image: 'twang2218/gitlab-ce-zh:11.1.4'
      restart: unless-stopped
      hostname: 'git.woetu.com'
      environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://git.woetu.com'
          gitlab_rails['time_zone'] = 'Asia/Shanghai'
          # 需要配置到 gitlab.rb 中的配置可以在这里配置，每个配置一行，注意缩进。
          # 比如下面的电子邮件的配置：
          # gitlab_rails['smtp_enable'] = true
          # gitlab_rails['smtp_address'] = "smtp.exmail.qq.com"
          # gitlab_rails['smtp_port'] = 465
          # gitlab_rails['smtp_user_name'] = "xxxx@xx.com"
          # gitlab_rails['smtp_password'] = "password"
          # gitlab_rails['smtp_authentication'] = "login"
          # gitlab_rails['smtp_enable_starttls_auto'] = true
          # gitlab_rails['smtp_tls'] = true
          # gitlab_rails['gitlab_email_from'] = 'xxxx@xx.com'
      ports:
        - '8099:80'
        - '442:443'
        - '22:22'
      volumes:
        # - /home/gitlab/config:/home/gitlab/config
        # - /home/gitlab/data:/home/gitlab/data
        # - /home/gitlab/logs:/home/gitlab/logs
        - config:/etc/gitlab
        - data:/var/opt/gitlab
        - logs:/var/log/gitlab
volumes:
    config:
    data:
    logs:
```


### Gogs

[Gogs-DockerHub](https://hub.docker.com/r/gogs/gogs)

[Gogs-GitHub](https://github.com/gogs/gogs/blob/master/README_ZH.md)

[Gogs官方文档](https://gogs.io)

[安装教程](https://www.jianshu.com/p/86c385682ac8)

### Gitea

[Gitea-DockerHub](https://hub.docker.com/r/gitea/gitea)

[Gitea-GitHub](https://github.com/go-gitea/gitea/blob/master/README_ZH.md)

[Gitea官方文档](https://gitea.io/zh-cn)



## GitHub


### 访问速度过慢

* [https://myssl.com/dns_check.html](https://myssl.com/dns_check.html)

* [http://tool.chinaz.com/dns](http://tool.chinaz.com/dns)

* [Windows设置GitHub的Hosts脚本](/files/设置GitHub的Hosts.bat)

#### 刷新DNS缓存

- macOS

```bash
killall -HUP mDNSResponder
dscacheutil -flushcache
```

- Windows

```bash
ipconfig /flushdns
```

- Linux

```bash
service nscd restart
```

- Ubuntu

```bash
sudo /etc/init.d/dns-clean start
```


### 部署

* [https://www.netlify.com](https://www.netlify.com)

* [https://slack.com/get-started](https://slack.com/get-started)

* [https://docs.travis-ci.com/user/tutorial](https://docs.travis-ci.com/user/tutorial)

* [https://zeit.co](https://zeit.co)



### Online IDE

* [https://www.onlinegdb.com](https://www.onlinegdb.com)

* [https://wandbox.org](https://wandbox.org)

* [https://github.com/mattgodbolt/compiler-explorer](https://github.com/mattgodbolt/compiler-explorer)

* [https://codesandbox.io](https://codesandbox.io)

**Gitpod**

> Gitpod是一款在线IDE能即时修改GitHub代码

> https://gitpod.io/#https://github.com/账户名/仓库名

> 示例：https://gitpod.io/#github.com/woytu/UseNotes-vuepress

[![](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/woytu/UseNotes-vuepress)


### 克隆代理地址

> 替换`https://github.com`为`https://github.com.cnpmjs.org`

### `Custom domain`被清空

> 发布成功之后github pages的Custom domain配置项就被清空

[github-pages-basics](http://wiki.jikexueyuan.com/project/github-pages-basics/cname-file.html)