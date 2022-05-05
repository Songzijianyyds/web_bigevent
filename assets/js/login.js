$(function () {
    $('#link-reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })


//从layui.js中获取form
    var form = layui.form
    var layer = layui.layer
//利用form.verify定义验证数据
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能出现空格'],
    //判断两个密码是否一致
    repwd: function (value) {
        //value是密码确认的值
        //pwd是设置密码的值
        var pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) 
            return '两次密码不一致，请重新输入'
    }
})
    
    //监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        //1.阻止默认的提交行为
        e.preventDefault()
        //2.发起ajax的post请求
        var data =  { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功');
            //模拟人的点击行为 注册完之后自动进入登录页面
            $('#link-login').click()
        })
    })
    //监听登录表单提交事件
    $('#from_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            //快速获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功! ')
                console.log(res.token);
                //跳转到后台主页
                location.href = '/code/index.html'
            }
       })
    })
    
})


    