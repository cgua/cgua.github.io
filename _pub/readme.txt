<h1 id="-">无名博客系统</h1>
<blockquote>
<p>一个重复造 hexo 轮子的个人博客系统<br>不同之处主要在于</p>
<ol>
<li>用目录管理专辑</li>
<li>以单页模式发布，以缩短开发周期，以及便于单仓库写日志。未来如果想到其它更好的方案再修改，些方案主要问题是不利于 seo</li>
<li>超微型日志背景(不知道该怎么描述，等我实现吧。 &gt; &lt;)</li>
</ol>
</blockquote>
<h2 id="-">项目主要目录结构</h2>
<p>  |- index.html 主页<br>  |<br>  |- res 客户端文件<br>  |<br>  |- lib 服务端文件<br>  |<br>  |- md  写日志的地方<br>  |<br>  |- eslint eslint 规则配置<br>  |<br>  |- .vscode 主要是存放了 eslint 中文架构文档<br>  |<br>  |- _pub 发布目录，编译过的 .md<br>  |<br>  |- test 单元测试（未启用）  </p>
