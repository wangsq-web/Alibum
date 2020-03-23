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