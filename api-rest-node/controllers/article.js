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


const list = async ( req, res) => {

    let limit = req.params.last
    let cant = 0

    let articles = !limit ? await Article.find({}).sort({ date: -1 }) : await Article.find({}).sort({ date: -1 }).limit( limit )

    cant = articles.length

    let status = articles ? 200 : 404

    return res.status(status).json({
        status,
        cant,
        articles
    })
}

const one = async (req, res) => {

    const articleId = req.params.one
    let article = null
    let state = 200

    try {
        article = await Article.findById(articleId)
    } catch (error) {
        state = 500
    }

    res.status(state).json({
        article
    })

}

const deleteArticle = async ( req, res ) => {

    const articleId = req.params.articleId
    let article = null
    let status = 200

    try {
        article = await Article.findOneAndDelete( { _id: articleId } )
    } catch (error) {
        status = 500
    }

    return res.status(status).json({
        article
    })
}


const edit = async ( req, res ) => {
    const status = 200
    let article = null
    const articleId = req.params.articleId
    const parameters = req.body

    //Con el parametro { new: true } retorna el objeto que modifico no el anterior
    try {
        article = await Article.findOneAndUpdate( { _id: articleId },  parameters, { new: true })
    } catch (error) {
        status = 500
    }

    return res.status(status).json({
        article
    })
}

module.exports = {
    test,
    course,
    create,
    list,
    one,
    deleteArticle,
    edit
}