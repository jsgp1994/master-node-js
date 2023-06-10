
const testUser = async (req, res) => {
    res.status(200).json({
        message: "Mensaje enviado desde el controlador de User"
    })
}

//Registro de usuarios
const register = (req, res) => {
    return res.status(200).json({
        message: "Acción de registro de usuarios"
    })
}

module.exports = {
    testUser,
    register
}