const validator = require('validator')
const Article = require('../models/Article')

const test = ( req, res ) => {
    return res.status(200).json({
        mensaje: 'Soy un acción de test en mi controlador de artículos'
    })
}

const course = (req, res) => {
    return res.status(200).json([
        { course: "Master en React", author: "Pepito Perez" },
        { course: "Master en vue", author: "Testing" }
    ])
}

const create = (req, res) => {
    let state = 200
    let message = 'Acción de guardar'
    let article = null

    //Recoger parametros
    let parameters = req.body

    try {
        if ( validator.isEmpty(parameters.title) || validator.isEmpty(parameters.content) || !validator.isLength(parameters.title, { min: 0, max: 40 }) ) {
            throw new Error("El titulo y el contenido es obligatorio")
        }

        //Guardar el objeto en la base de datos
        article = new Article(parameters)
        article.save()

    } catch (error) {
        state = 400
        message = `error: ${error} `
    }


    return res.status(state).json({
        message,
        article
    })

}

module.exports = {
    test,
    course,
    create
}