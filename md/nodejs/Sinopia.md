<!----------------------
   author: cgua
   date  : 2018-10-31
   tags  : npm sinopia
 ---------------------->

# Sinopia
> 用于搭建 npm 仓库的小工具  

参考文档：  

* [会飞的猪](https://www.jianshu.com/p/20856933f202)

### 需求：

出于各种原因需要一个私有 npm 仓库


###  解决方案：  

1. git+ssh: 直接引用到 GitHub 项目地址  

    勉强及格，如果没有更好的办法的话倒也不失为一个好办法。

1. cnpm  

    要数据库有点重，其它各方面堪称完美。

1. sinopia  

    好处：  

        - 配置简单，开箱即食。  
        - 支持代理，当本地不存在要安装的包时,会自动去远程仓库拉取包。  
        - 还有个看起来高大上的在线页面哟，疯狂点赞。逼格瞬间高了好几个档次。  

    缺点：  

        - 有坑。

***

## 安装及试运行：  

``` bash
$npm i -g sinopia
$sinopia
```

之后打开 [http://localhost:4873] 试试，出现包搜索页面则表示成功了。

## 配置:

### 配置文件地址

- windows: %userprofile%\AppData\Roaming\sinopia\
- linux 或是设置 HOME 的情况下: /home/.config/sinopia/  

[注]安装完成之后,需要先运行一次 `sinopia` 才会生成配置文件。  

默认配置：允许所有人做他们想做的任何事，但是只能本地访问。

### 目录结构

- config.yaml — 配置访问权限，代理，文件存储路径等所有配置信息的  
- storage — 缓存npm包目录  
- htpasswd — 保存用户的账号密码等信息  

> storage ，htpasswd 是添加用户之后自动创建的

### 配置选项

#### 添加代理：

![scope proxy](img/sinopia-scope-proxy.png)
