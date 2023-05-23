const Article = require('../models/Article')
const fs = require("fs")
const { validatorArticle } = require('../helpers/validateArticle')

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


const create = async (req, res) => {
    let state = 200
    let message = 'Acción de guardar'
    let article = null

    //Recoger parametros
    let parameters = req.body

    try {
        await validatorArticle(parameters)
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

const updateImage = async( req, res) => {
    let status = 500
    let file = null
    let fileSplit = null
    let extension = null
    let message = 'Imagen guardada con exito'

    try {
        if (req.file) {
            file = req.file.originalname
            fileSplit = file.split(".")
            extension = fileSplit[1]

            if( extension != 'png' && extension != 'jpg' && extension != 'gif' && extension != 'jpeg' ){
                fs.unlink(req.file.path, (error) => {
                    if (error) {
                      console.error('Ocurrió un error al eliminar el archivo:', error)
                    }
                })
                status = 200
                message = "Formato invalido"
            }else{
                status = 200
            }
        }else{
            message = 'La imagen es obligatoria'
        }
    } catch (error) {
        status = 500
        message = error
    }

    return res.status(status).json({
        status,
        message
    })

}

module.exports = {
    test,
    course,
    create,
    list,
    one,
    deleteArticle,
    edit,
    updateImage
}