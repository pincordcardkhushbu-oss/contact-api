const http = require('http')

const port = 3000;
const app = require('./app')

const server = http.createServer(app)

console.log(process.env.MONGO_URI)


server.listen(port,()=>{console.log("this app is runing on port "+port)})