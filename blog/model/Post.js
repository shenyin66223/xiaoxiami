var mongodb = require('./db');
//引入Markdown
var markdown = require('markdown').markdown
function Post(name, title, content) {
    this.name
        = name;
    this.title = title;
    this.content = content;
}
//格式化时间的函数
function formatDate(num) {
    return num < 10 ? '0' +num : num
}


Post.prototype.save = function (callback) {
    //    1.格式化时间
    var date = new Date();
    var now = date.getFullYear() + '-' + formatDate((date.getMonth() + 1)) + '-' +formatDate(date.getDate()) + '-'
        + formatDate(date.getHours()) + ':' + formatDate(date.getMinutes()) + ':' +formatDate(date.getSeconds());
    //    2.收集数据
    var newContent = {
        name:this.name,
        title:this.title,
        content:this.content,
        time:now
    }
    //    3.打开数据库
    //    4.读取posts集合
    //    5.将数据插入到集合中，并跳转到首页
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert(newContent,function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                return callback(null,doc);
            })
        })
    })
}
//获取所有文章
Post.get = function (name, callback) {
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            var query = {}
            if(name){
                query.name = name;
            }
            collection.find(query).sort({time:-1}).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                //将每篇文章在读取的时候以Markdown的形式进行解析
                docs.forEach(function(doc){
                    doc.content = markdown.toHTML(doc.content);
                })
                return callback(null,docs);
            })
        })
    })
}
module.exports = Post;