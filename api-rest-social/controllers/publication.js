
const testPublication = async (req, res) => {
    res.status(200).json({
        message: "Mensaje enviado desde el controlador de Publication"
    })
}

module.exports = {
    testUser
}