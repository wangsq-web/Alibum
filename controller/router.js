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