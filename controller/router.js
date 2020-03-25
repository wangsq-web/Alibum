var file = require("../models/file.js");
var fs = require("fs");
var formidable = require("formidable");
var path = require("path");

exports.showIndex = function(req,res){
    // res.render("index",{
    //     "albums": file.getAllalbums()
    // });

    // 文件读取是异步的，所以必须要使用回调函数
    file.getAllalbums(function(allAlbums){
        res.render("index",{
            "albums": allAlbums
        })
    })
}

exports.showAlbum = function(req,res,next){
    var albumName = req.params.albumName;
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
            next()
            return
        }
        res.render("album",{
            "albumName": albumName,
            "images": imagesArray
        })
    })
}

exports.upAlbum = function(req,res,next){

  file.getAllalbums(function(allAlbums){
    res.render("upload",{
        "albums": allAlbums
    })
  })
}

exports.upFile = function(req,res,next){
  
    var form = formidable({ 
        multiples: true, 
        uploadDir: __dirname+'/../uploads' 
    })
    form.parse(req, (err, fields, files) => {
        if(err){
            next();
            return;
        }
        var size = parseInt(files.tupian.size);
        // 没选择图片
        if(size == 0){
            res.send("不能提交空表单");
            return;
        }
        if(size > 2048000){
            res.send('上传图片不能大于 2 M')
            fs.unlink(files.tupian.path,function(err){
                if(err){
                    throw Error('删除失败')
                }
                console.log('上传图片并删除图片成功')
            })
            return
        }

        // 时间戳+随机数命名
        var date = new Date().getTime();
        var ran = parseInt(Math.random() * 8999 + 1000);
        var extname = path.extname(files.tupian.name);

        var folderName = fields.albumName;
        
        var oldpath = files.tupian.path;
        var newpath =  __dirname+'/../uploads/'+ folderName + '/' + date + ran + extname;

        fs.rename(oldpath,newpath,function(err){
            if(err){
                throw Error('改名失败')
            }
            res.send('上传成功')
        })
    })
}