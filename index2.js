var fs = require("fs")

let components = []

fs.readdir("./upload",(err,files)=>{
  files.forEach( (item,index)=>{
    let stat = fs.lstatSync("./upload/" + item)
    if (stat.isDirectory() === true) { 
      components.push(item)
    }
  })
  console.log(files)
  console.log(components)
})
