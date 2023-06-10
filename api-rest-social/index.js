const connection = require("./database/connection")
const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/user")
const followRoutes = require("./routes/follow")
const publicationRoutes = require("./routes/publication")

//Conexión a mongo
connection()

//Crear servidor y configuraciones de node
const app = express()
const port = 3900

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))

app.use('/api/user',userRoutes)
app.use('/api/publication',publicationRoutes)
app.use('/api/follow',followRoutes)



app.listen(port, () => {
    console.log("Servidor de node corriendo: ", port)
})