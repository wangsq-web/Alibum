var file = require("../models/file.js");

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
    if(err){
        next()
        return
    }
    res.render("upload",{
        "albums": allAlbums
    })
  })
}

exports.upFile = function(req,res,next){
  
  var form = formidable({ multiples: true, uploadDir: __dirname + '/upload' })
}