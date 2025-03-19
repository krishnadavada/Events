const http=require('http')

const middlewares=[]

function use(middleware){
    middlewares.push(middleware)
}

function run(req,res){
    let i=0

    function next(err){
       if(err){
          res.writeHead(500)
          res.end(err.mesaage)
          return
       }

       if(i>=middlewares.length){
         res.writeHead(500)
         res.end(err.mesaage)
         return
       }

       const middleware=middlewares[i++]
       middleware(req,res,next)
    }

    next()
}
http.createServer((req,res)=>{
    run(req,res)
}).listen(3000,()=>{
    console.log('server is running on port http://localhost:3000/')
})

use((req,res,next)=>{
    console.log('first middleware')
    next()
})

use((req,res,next)=>{
    console.log('second middleware')
    next()
})

use((req,res,next)=>{
    console.log('last middleware')
    res.end('hello world')
})