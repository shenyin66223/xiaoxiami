//数据库配置信息
module.exports = {
    cookieSecret:'wjx', //加密cookie使用的字符串
    db:'blog', //数据库名称
    host:'localhost', //数据库地址
    port:27017 //数据库的端口号
}
/*我们把数据库的配置信息写在这里，是为了连接数据库的时候，
一旦数据库的地址或是名称、连接、端口号发生变化时，我们只要在这里进行修改就可以了*/