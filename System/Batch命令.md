# Batch命令


[[toc]]




## flag

* [Windows 命令-官方文档](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands)

* [windows常用命令](https://www.cnblogs.com/kekec/p/3662125.html)

* [windows批处理语法](https://www.cnblogs.com/kekec/p/3937530.html)

* [windows之四十个bat脚本命令](https://juejin.im/post/5d50c631518825378d5d6121)

* [windows bat脚本总结](https://segmentfault.com/a/1190000018614430)


* [Windows 10/8/7的Rundll32命令列表](https://www.thewindowsclub.com/rundll32-shortcut-commands-windows)



- `if`和`for`的条件与后面跟的`(`之间必须要有一个空格，否则会出现`命令语法不正确`的问题！

- 使用cd切换目录时，如果带盘符一定要加`/d`参数，否则切换无效

- 双引号中包含双引号最里层的要用三个`"""`转义，`&`符号要用`^`转义
  - 示例:使用`curl`配合`jq`获取必应壁纸下载地址
  
```batch
curl "http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1" | jq-win64.exe ".images[0].url | """https://cn.bing.com""" + .[0:index("""^&""")]" >> bing.txt
```


## 文件操作

### 查看目录下的文件

> 类似于linux下的ls

```batch
dir
```

### 创建目录

```batch
md 目录名（文件夹）
```

### 删除目录

```batch
rd  目录名（文件夹）
```

### 拷贝文件

```batch
copy 路径\文件名 路径\文件名
```

### 移动文件

```batch
move 路径\文件名 路径\文件名
```
### 删除文件

> 不能删除文件夹

```batch
del 文件名
```


## 环境变量

* [set](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/set_1)

* [setx](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/setx)

**`SET`与`SETX`的区别**

- `SET` 用于设置临时环境变量和查看环境变量

- `SETX` 用于设置用户环境变量和系统环境变量

> 变量值有空格或`%`等特殊字符时必须用`"`包括起来

> `SETX 变量名 变量值` 设置用户环境变量，记录在注册表`HKEY_CURRENT_USER`

> `SETX /M 变量名 变量值` 设置系统环境变量，记录在注册表`HKEY_LOCAL_MACHINE`


### 查看环境变量

- 查看所有环境变量

```batch
:: 在末尾输入变量名就是查询单个变量
SET
:: 或者这样查询单个环境变量
ECHO %PATH%
```

- 查看用户环境变量

```batch
:: 替换最后的*号为变量名就是查询单个变量
REG QUERY "HKCU\Environment" /v *
```

- 查看系统环境变量

```batch
:: 替换最后的*号为变量名就是查询单个变量
REG QUERY "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v *
```

### 设置环境变量

- 临时有效

```batch
set path=%path%;D:\test
```

- 永久有效

```batch
setx path "%path%;D:\test"
setx /m path "%path%;D:\test"
```



## 查看本机ip

```batch
ipconfig
```

## 查DNS

```batch
nslookup 域名
```

## 刷新DNS

> `C:\Windows\System32\drivers\etc\hosts`

```batch
ipconfig /flushdns
```


## 清除屏幕

> 类似于linux下的clear

```batch
cls
```


## 查看端口占用

```batch
netstat -an | find "0.0.0.0:80"
```

## 查看占用的`pid`

> 在`windows`系统下，不能直接使用反引号执行命令，要使用`for`循环变通下，在`for`循环中使用单`'`括起来执行命令

> 在`cmd`命令窗口中直接使用`for`循环只能使用单`%`设置变量
>
> 而在`bat`脚本文件中只能用双`%%`设置变量
>
> 而且在`for`循环中执行的命令带有`|`等特殊符号需要使用`^`转义


```batch
:: 用findstr命令搜索
for /f %%i in ('tasklist ^| findstr /i "程序名"') do set reslut=%%i

:: 只输出PID编号
for /f "skip=3 tokens=2" %a in ('tasklist /fi "imagename eq 程序名*"') do @echo %a
```

## 查看被占用端口的`pid`

```batch
netstat -ano | findstr 80
```

## 结束进程

```batch
taskkill /pid 进程号 /f
taskkill /f /im 程序名
```


## 延时

```batch
:: 延时等待10秒
choice /t 10 /d y /n >nul
:: 延时等待10秒
timeout /T 10 /NOBREAK
:: 持续等待，直到按下任意按键，类似于pause
timeout /T -1
:: 持续等待，直到你按下CTRL+C按键
timeout /T -1 /NOBREAK
```

## 判断变量字符串

> 注意：在|两端不能有空格，如果有空格则会出现匹配不正确
> 
> 这里有个BUG不能取反匹配，比如用`[^0-9]`匹配不是纯数字的字符，匹配到`.`会通过

- 判断是否为数字、字母

```batch
:: 判断是否为数字、字母，在|两端不能有空格
:: 注意这里有个bug不能用[^0-9]取反，匹配到.会通过
echo %var%|findstr "^[a-z0-9]*$" >nul && (
    ECHO.
    ECHO.输入的：%var%
    ECHO.
) || (
    ECHO.
    ECHO.输入的必须为纯小写字母或数字！
    ECHO.
)
```

- 判断是否为纯数字

```batch
:: 判断是否为纯数字，在|两端不能有空格
:: 注意这里有个bug不能用[^0-9]取反，匹配到.会通过
echo %port%|findstr "^[0-9]*$" >nul && (
    ECHO.
    ECHO.输入的端口：%port%
    ECHO.
) || (
    ECHO.
    ECHO.端口必须为纯数字！
    ECHO.
)
```

## 获取目录名

```batch
:: 顺序循环，设置最后一个为当前目录
for /f "delims=" %%i in ("%cd%") do set folder=%%~ni
echo %folder%

:: 仅将 %0 扩充到一个路径
set currentPath=%~dp0
:: 替换\为,号，也可以替换为空格
set currentPath=%currentPath:\=,%
:: 顺序循环，设置最后一个为当前目录
for %%a in (%currentPath%) do set folder=%%a
echo %folder%
```


## 获取为指定后缀的文件

```batch
::获取为指定后缀的文件
for /r %~dp0 %%a in (*.jpg,*.png) do (
	::把文件后缀赋值给变量
	set suffix = %%~xa
	::把文件名赋值给变量（没有后缀）
	set name = %%~na
	::把路径赋值给变量（不带驱动号和文件名）
	set path = %%~pa
	::把驱动号赋值给变量
	set drive = %%~da
	
	::判断后缀
	if /i "!suffix!" neq ".bmp" (
		ren "%%~a" "%%~na.bmp"
	)
)
```
```batch
::获取为指定后缀的文件
for /f "delims=" %%i in ('dir /s /b /a  %~dp0 ^| findstr /e "\.jpg\> \.png\>"') do (
	::把文件后缀写入文件
	echo %%~dpnxi >> test.txt
)
```

## 获取不为指定后缀的文件

```batch
::获取不为指定后缀的文件
for /f "delims=" %%i in ('dir /s /b /a  %~dp0 ^| findstr /v "\.bat\> \.text\> \.exe\>"') do (
	::把文件后缀写入文件
	echo %%~dpnxi >> test.txt
)
```

## 判断字符串是否包含子字符串

```batch
:: 判断变量字符串中是否包含字符串
echo %字符串% | findstr %子串% >nul && (
    echo 包含
) || (
    echo 不包含
)
```
```batch
set error=1
:: 判断文件中是否包含字符串
findstr/i "123" 1.txt >nul 2>nul&&set "error="
if defined error (
    echo 不包含
) else (
    echo 包含
)
```

## 替换文件中指定内容

```batch
@echo off
:: 解决把中文写入文件乱码问题（声明采用UTF-8编码），936为GBK，437为美国英语
:: https://blog.csdn.net/python_class/article/details/81560470
chcp 65001

:: 开启延迟环境变量扩展
:: 解决for或if中操作变量时提示ECHO OFF问题，用!!取变量
:: 解决调用jscript提示命令错误问题
setlocal EnableDelayedExpansion

set file=%~dp0nav.md
:: 替换文件中指定内容
(
    for /f "tokens=*" %%i in (%file%) do (
        :: 把当前行的内容赋值到变量
        set s=%%i
        :: 不为空行时
        if not !s!.==. (
            :: 替换内容中的反斜杠为正斜杠
            set s=!s:\=/!
            echo !s!
        )
    )
)>%file%

goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
```

## 判断是文件还是文件夹

> 如果是文件夹，则`test`和`test\`、`test\.`、`test\nul`是等同的；
> 如果是文件，则`test`不等同于三者中的任何一个

```batch
if exist test\ (
    echo test 是文件夹
) else (
    echo test 是文件
)
```

```batch
dir /ad test >nul 2>nul && (
    echo test 是文件夹
) || (
    echo test 是文件
)
```


