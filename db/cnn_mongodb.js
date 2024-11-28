import mongoose from 'mongoose'

let isConnected = false

const conectarAMongoDB = async () => {
    if (isConnected) {
        console.log('Ya esta conectado a mogoDB'.green)
        return
    }

    try{
        await mongoose.connect(process.env.MONGO_URI)
        isConnected = true
        console.log('Conectado a mongoDB'.green)
    }catch(error){
        console.log('Error al conectar a MongoDB'.red)
    }
}

const db = mongoose.connection

db.on('error', (error)=>{
    isConnected = false
    console.log('Error en la conexion a MongoDB'.red)
})

db.once('open', ()=>{
    isConnected = true
})

db.on('disconnected', ()=>{
    isConnected = false
    console.log('Desconectado de MongoDB'.yellow)
})

process.on('SIGINT', async ()=>{
    await mongoose.connection.close()
    console.log('Desconectado de MongoDB'.yellow)
    process.exit(0)
})

export {conectarAMongoDB, isConnected}