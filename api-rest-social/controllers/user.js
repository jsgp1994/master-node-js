
const testUser = async (req, res) => {
    res.status(200).json({
        message: "Mensaje enviado desde el controlador de User"
    })
}

module.exports = {
    testUser
}