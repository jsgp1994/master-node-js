const mongoose = require("mongoose")

const connection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/red_social")
        console.log("Conectado directamente a la db: red_social")
    } catch (error) {
        console.log(error)
        throw new Error("No se ha logrado conectar a la base de datoSs !!")
    }
}

module.exports = connection