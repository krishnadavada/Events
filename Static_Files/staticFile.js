// const http=require("node:http")
// const fs=require("node:fs")
// const path=require('node:path')

// const oMimeType=require('./mimeType.js')

// const dotenv=require('dotenv')
// dotenv.config()
// const nPort=process.env.PORT || 3000

// const server=http.createServer((req,res)=>{

//     if(req.url==='/test' && req.method==='GET'){
//         try{
//             res.writeHead(200,{"content-type":"application/json"})
//             res.end(JSON.stringify({'status':'up','timeStamp':new Date()}))
//         }
//         catch(err){
//             res.end(JSON.stringify({'status':'down','reason':err.message}))
//         }
//      }

//      else if(req.url==='/style' && req.method==='GET'){
//         try{
//             fs.readFile(path.join(__dirname,'public','style.css'),(err,data)=>{
//                 if(err){
//                     if(err.code==='ENOENT'){
//                         res.writeHead(404,{"content-type":"application/json"})
//                         res.end(JSON.stringify({'message':'File Not Found !'}))
//                     }
//                     else{
//                         res.writeHead(500,{'content-type':'application/json'})
//                         res.end(JSON.stringify({'message':`Error : + ${err.code}`}))
//                     }
//                     return
//                 }
//                 res.writeHead(200,{'content-type':'text/css'})
//                  res.end(data,'utf-8')                  
//             })
//         }
//         catch(err){
//             res.end(err.message)
//         }
//      }

//      else if(req.url==='/script' && req.method==='GET'){
//         try{
//             fs.readFile(path.join(__dirname,'public','script.js'),(err,data)=>{
//                 if(err){
//                     if(err.code==='ENOENT'){
//                         res.writeHead(404,{"content-type":"application/json"})
//                         res.end(JSON.stringify({'message':'File Not Found !'}))
//                     }
//                     else{
//                         res.writeHead(500,{'content-type':'application/json'})
//                         res.end(JSON.stringify({'message':`Error : + ${err.code}`}))
//                     }
//                     return
//                 }
//                 res.writeHead(200,{'content-type':'text/js'})
//                 res.end(data,'utf-8')                  
//             })
//         }
//         catch(err){
//             res.end(err.message)
//         }
//      }

//      else if(req.url==='/' && req.method==='GET'){
//         try{
//             fs.readFile(path.join(__dirname,'public','index.html'),(err,data)=>{
//                 if(err){
//                     if(err.code==='ENOENT'){
//                         res.writeHead(404,{"content-type":"application/json"})
//                         res.end(JSON.stringify({'message':'File Not Found !'}))
//                     }
//                     else{
//                         res.writeHead(500,{'content-type':'application/json'})
//                         res.end(JSON.stringify({'message':`Error : + ${err.code}`}))
//                     }
//                     return
//                 }
//                 res.writeHead(200,{'content-type':'text/html'})
//                  res.end(data)                  
//             })
//         }
//         catch(err){
//             res.end(err.message)
//         }
//      }

//      else{
//         try{
//             res.writeHead(404,{"content-type":"text/plain"})
//             res.end(JSON.stringify({message:'Not Found !'}))
//         }
//         catch(err){
//             res.end(err.message)
//         }
//      }
// })

// server.listen(nPort,()=>{
//     console.log(`server is running on http://localhost:${nPort}`)
// })


const http=require("node:http")
const fs=require("node:fs")
const path=require('node:path')

const mimeTypes=require('./mimeType.js')

const dotenv=require('dotenv')
dotenv.config()
const nPort=process.env.PORT || 3000

const server=http.createServer((req,res)=>{

    if(req.url==='/test' && req.method==='GET'){
        try{
            res.writeHead(200,{"content-type":"application/json"})
            res.end(JSON.stringify({'status':'up','timeStamp':new Date()}))
        }
        catch(err){
            res.end(JSON.stringify({'status':'down','reason':err.message}))
        }
     }

    else if(req.url){

    let filePath=req.url

        if(filePath==='/'){
            filePath='public/index.html'
        }
        else{
            filePath=path.join('public',filePath)
        }
    
        let ext=String(path.extname(filePath).toLowerCase())
    
        let contentType=mimeTypes.mimeTypes[ext]
    
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT') {
                    fs.readFile('public/404.html', function(error, content) {
                        res.writeHead(404, { 'content-type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                }
                else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                }
            }
            else {
                res.writeHead(200, { 'content-type': contentType });
                res.end(content, 'utf-8');
            }
        });    
    }

     else{
        try{
            res.writeHead(404,{"content-type":"text/plain"})
            res.end(JSON.stringify({message:'Not Found !'}))
        }
        catch(err){
            res.end(err.message)
        }
     }
})

server.listen(nPort,()=>{
    console.log(`server is running on http://localhost:${nPort}/`)
})