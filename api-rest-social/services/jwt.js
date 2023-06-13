//Importar dependencias
const jwt = require("jwt-simple")
const moment = require("moment")

//Clave secreta
const secret = "testing_11."

//Crear tokens

const createToken = async(user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        imagen: user.image,
        iat: moment().unix(),
        exp: moment().add(50, "seconds").unix()
        //exp: moment().add(1, "day").unix()
    }

    //Retornar jwt
    return jwt.encode( payload, secret )
}


module.exports = {
    secret,
    createToken
}