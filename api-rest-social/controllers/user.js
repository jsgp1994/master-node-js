const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("../services/jwt")

const testUser = async (req, res) => {
    res.status(200).json({
        message: "Mensaje enviado desde el controlador de User",
        user: req.user
    })
}

//Registro de usuarios
const register = async (req, res) => {

    let params = req.body
    let message = "Acción de registro de usuarios"
    let status = 200

    if ( !params.name || !params.email || !params.password || !params.nick) {
        return res.status(400).json({ message: "Faltan datos por enviar" })
    }

    //Control de usuarios duplicados
    const dataUser = await User.find({ $or: [
        { email:  params.email.toLowerCase() },
        { nick:  params.nick.toLowerCase() }
    ]}).exec()


    if(dataUser.length > 0){
        return res.status(500).json({ message: "El usuario ya se encuentra registrado" })
    }

    //Cifrar la contaseña
    let salt = 10 //Número de saltos que quiere encriptar
    let pwd = await bcrypt.hash( params.password, salt)
    params.password = pwd

    //Crear objeto de usuario
    let user_to_save = new User(params)

    //Guardar el objeto en la base de datos
    const userStored = await user_to_save.save()

    return res.status(status).json({
         message,
         userStored
    })
}

const login = async ( req, res ) => {

    //Recoger parametros del Body
    let params = req.body

    if( !params.email || !params.password ){
        return res.status(500).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    //Buscar en la base de datos si existe el usuario
    const user = await User.findOne({
         email:  params.email.toLowerCase()
    }).exec()

    if(user === null){
        return res.status(500).json({
            status: "error",
            message: "El usuario no existe"
        })
    }

    //Comprobar contraseña
    let pwd = bcrypt.compareSync( params.password, user.password )

    if(!pwd){
        return res.status(500).json({
            status: "error",
            message: "Las credenciales de acceso no son correctas"
        })
    }


    //Retornar token
    const token = await jwt.createToken(user)

    //Retornar datos del usuario


    return res.status(200).json({
        status: "success",
        message: "Te has identificado correctamente",
        user: {
            id: user._id,
            name: user.name,
            nick: user.nick
        },
        token
    })

}

module.exports = {
    testUser,
    register,
    login
}