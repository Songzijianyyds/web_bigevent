//在每次调用post get ajax请求之都会调用ajaxPrefilter函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);
})