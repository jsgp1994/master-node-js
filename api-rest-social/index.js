const connection = require("./database/connection")
const express = require("express")
const cors = require("cors")

//Conexión a mongo
connection()

//Crear servidor y configuraciones de node
const app = express()
const port = 3900

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))


app.listen(port, () => {
    console.log("Servidor de node corriendo: ", port)
})