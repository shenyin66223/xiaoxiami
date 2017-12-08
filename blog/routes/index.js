module.exports = function(app){
  //主页
  app.get('/',function(erq,res){
    res.render('index',{
      title:'首页'
    })
  })
  //注册页面
  app.get('/reg',function(erq,res){
    res.render('reg',{
      title:'注册页面'
    })
  })
  //注册行为
  app.post('/reg',function(req,res){

  })
  //登录页面
  app.get('/login',function(erq,res){
    res.render('login',{
      title:'登录页面'
    })
  })
  //登录行为
  app.post('/login',function(req,res){
    
  })
  //发表
  app.get('/post',function(erq,res){
    res.render('post',{
      title:'发表'
    })
  })
  //发表行为
  app.post('/post',function(req,res){
    
  })
  //退出
  app.get('/logout',function(erq,res){
    
  })
}