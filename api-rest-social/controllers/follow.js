
const testFollow = async (req, res) => {
    res.status(200).json({
        message: "Mensaje enviado desde el controlador de follow"
    })
}

module.exports = {
    testUser
}