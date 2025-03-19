const EventEmitter=require('node:events')

class tempSens extends EventEmitter{
    constructor(){
        super()
        this.temp=0
    }

    updateTemp(newTemp){
        this.temp=newTemp
        this.emit('updateTemp',this.temp)
    }
}

const oT1=new tempSens(20)

oT1.on('updateTemp',(temp)=>{
    if(temp<25){
     console.log('getting hot...')
    }
    else if(temp<25){
     console.log('getting cold...')
    }
    else{
     console.log('temperature is normal...')
    }
 })

oT1.on('updateTemp',(temp)=>{
    console.log('temperature update : ',temp)
})

oT1.updateTemp(20)
oT1.updateTemp(100)
oT1.updateTemp(25)


