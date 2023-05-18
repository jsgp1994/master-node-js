const { connection } = require("./database/connetion")
const express = require("express")
const cors = require("cors")
const puerto = 3000

console.log("App iniciada")

// Conectar a la base de datos
connection()

// Crear servidor Node
const app = express()

// Configurar cors
app.use(cors())

// Convertir body a objeto js
app.use(express.json())

// Crear rutas
app.get("/probando", (req, res) => {
    return res.status(200).json( { status: 200, name: "probando" } )
})

app.get("/", (req, res) => {
    return res.status(200).json( { status: 200, name: "Home" } )
})


// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`)
})