var http = require("http"),
    fs = require("fs"),
    url = require("url"),
    path = require("path"),
    querystring = require("querystring"),
    formidable = require("formidable"),
    sd = require("silly-datetime");

var server = http.createServer( function(req,res){
  
  var pathname = url.parse(req.url).pathname;

  if(req.url == '/dopost' && req.method.toLowerCase() == "post"){
    // var postData = '';
    // req.addListener("data",function(chunk){
    //   postData += chunk;
    // })
    // req.addListener("end",function(){
    //   var param = querystring.parse(postData.toString())
    //   console.log(param)
    //   res.writeHead(200,{'content-type': 'text/plain;charset=UTF-8'})
    //   res.end('成功')
    // })
    
    const form = formidable({ multiples: true, uploadDir: __dirname + '/upload' })

    form.parse(req, (err, fields, files) => {

      var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
      var ran = parseInt(Math.random() * 8999 + 1000);
      var extname = path.extname(files.tupian.name)

      var oldpath = files.tupian.path;
      var newpath = __dirname + '/upload/' + ttt + ran + extname;
    
      console.log(newpath)
      fs.rename(oldpath,newpath,function(err){
        if(err){
          throw Error('改名失败')
        }
        res.writeHead(200,{'content-type': 'text/plain;charset=UTF-8'})
        res.end('成功')
      })
    })

  }else {
    if(pathname.indexOf(".") == -1){
      pathname += 'index.html'
    }
    
    var extname = path.extname(pathname)

    // console.log('路径'+pathname)

    fs.readFile(__dirname + pathname,function(err,data){
      if(err){
        res.writeHead(404,{"Content-type": "text/html;charset=UTF-8"})
        res.end("文件没找到或不存在")
      }
      getMinme(extname,function(mime){
        // console.log('文件类型'+mime)

        res.writeHead(200,{"Content-type": mime + ";charset=UTF-8"})
        res.end(data)
      })
    })
  }
})

server.listen(4321,()=>{
  console.log('Server listening on http://localhost:4321')
})

function getMinme(extname,callback){
  fs.readFile(__dirname + '/content-type.json',function(err,data){
    if(err){
      throw Error("找不到json 文件")
      return
    }
    let mimeJSON = JSON.parse(data);
    var mime = mimeJSON[extname] || "text/plain"
    callback(mime);
  })
}