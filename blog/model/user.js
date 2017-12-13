//连接数据库的实例
var mongodb = require('./db');
//创建一个构造函数，命名为User，里面的username、password、email分别是用户名、密码、邮箱
function User(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User
//新增用户
User.prototype.save = function (callback) {
    //收集即将存入数据库的数据
    var user = {
        username: this.username,
        password: this.password,
        email: this.email
    }
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取users集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //查询name为指定用户名的用户信息，将返回结果
            collection.insert(user, { safe: true }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user[0]);
            })
        })
    })
}
//查询用户
User.get = function (name, callback) {
    //1.打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //2.读取users集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //3.查询用户名(name)的文档
            collection.findOne({ username: name }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
              return callback(null, user);
            })
        })
    })
}