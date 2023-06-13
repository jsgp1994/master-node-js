//Importar dependencias
const jwt = require("jwt-simple")
const moment = require("moment")

//Importar clave secreta
const libjwt = require("../services/jwt")
const secret = libjwt.secret

//Función de autenticacion

exports.auth = ( req, res, next ) => {
    //Comprobar si llega la cabecera de auth
    if( !req.headers.authorization ){
        return res.status(403).json({
            status: "error",
            message: "La petición no tiene la cabecera de autenticación"
        })
    }
    //Limpiar token
    let token = req.headers.authorization.replace(/\s+/g, '')

    try {
        //Decodificar token
        let payload = jwt.decode(token, secret)

        //Comnprobar si el token ya expiro
        if(payload.exp <= moment().unix()){
            return res.status(404).json({
                status: "error",
                message: "Token expirado"
            })
        }

        //Agregar datos del usuario a reqeuest
        req.user = payload

        next()


    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "Token invalido",
            error
        })
    }

}