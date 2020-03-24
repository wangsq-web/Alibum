var fs = require("fs");

exports.getAllalbums = function(callback){
    fs.readdir("./uploads",function(err,files){
        var allAlbums = [];
        (function iterator(i){
            if(i == files.length){
                // 结束
                // console.log(allAlbums)
                callback(allAlbums)
                return
            }
            fs.stat("./uploads/"+files[i],function(err,stats){
                if(stats.isDirectory()){
                    allAlbums.push(files[i])
                }
                iterator(i+1);
            })
        })(0)
    })
}
exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir("./uploads/"+albumName,function(err,files){
        if(err){
            callback("找不到文件",null)
            return
        }
        var allImages = [];
        (function iterator(i){
            if(i == files.length){
                // 结束
                callback(null,allImages)
                return
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],function(err,stats){
                if(stats.isFile()){
                    allImages.push(files[i])
                }
                iterator(i+1);
            })
        })(0)
    })
}