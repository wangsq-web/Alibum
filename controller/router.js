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

exports.showAlbum = function(req,res){
    res.send("相册名字："+ req.params.albumName)
}