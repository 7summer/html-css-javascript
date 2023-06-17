# 在线投票系统

## 简介
使用html+javascript+css实现在线投票系统，使用了框架jquery，适合刚学完html课程的同学进行学习。

## 包目录介绍
<ol>
<li>
    html文件夹：index投票主页、login登录页面、register注册页面、msg注册成功页面、voteresult投票结果页面
</li>
<li>
    css文件夹：对应html文件的样式
</li>
<li>
    js文件夹：对应html文件的javascript语句，data.js存放选手的投票信息
</li>
<li>
    images文件夹：页面中使用到的图片
</li>
<li>
    jquery文件夹：jquery框架源码
</li>
</ol>

## 界面介绍
<ol>
<li>
    登录界面：<br/>
    <img src="interface/登录页面.png" alt="登录页面" title="登录页面">
</li>
<li>
    注册界面：<br/>
    <img src="interface/注册页面.png" alt="注册页面" title="注册页面">
</li>
<li>
    投票页面：<br/>
    <img src="interface/投票界面.png" alt="主页" title="主页">
</li>
<li>
    投票结果页面：<br/>
    <img src="interface/投票结果.png" alt="投票结果页面" title="投票结果页面">
</li>
</ol>

## 功能介绍
<ol>
<li>
    用户在注册时需要输入用户名、密码、确认密码和验证码，用户名要求3到20位，密码要求6到30位，确认密码需要同密码一致，验证码要求同系统提供的验证码一致。注册信息若没按要求输入，系统会进行提醒。注册成功后，会将用户信息存储在localStorage
</li>
<li>
    登录功能：用户在登录时需要输入用户名、密码和验证码，用户名要求3到20位，密码要求6到30位，验证码要求同系统提供的验证码一致。登录信息若没按要求输入，系统会进行提醒。登录信息填写正确后，需要将登录信息同本地存储的用户信息进行比较，两者一致则登录成功。
</li>
<li>
    投票功能：用户在投票前需要进行登录，没有登录的用户无法进行投票，成功登录后每个用户拥有10票，可以投给任意一位选手，10票投完后不能再进行投票。用户的每一次投票，投票系统都会做出信息反馈，可以实时看到每一位选手的票数占比和票数。
</li>
<li>
    投票结果：用户可以查看投票结果，可以根据选手id升序排序、票数降序排序、票数升序排序。
</li>
</ol>