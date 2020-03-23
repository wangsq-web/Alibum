
exports.showIndex = function(req,res){
    res.send("我是首页")
}

exports.showAlbum = function(req,res){
    res.send("相册名字："+ req.params.albumName)
}