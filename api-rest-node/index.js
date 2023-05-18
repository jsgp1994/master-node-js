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
app.use(express.json()) //Recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })) //Middleware que permite recibir datos con content-type x-www-form-urlencoded

//Rutas
const routes_article = require('./routes/article')

//Se cargan las rutas
app.use("/api", routes_article)


// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`)
})