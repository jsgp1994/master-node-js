const validator = require('validator')

const validatorArticle = async ( parameters ) => {
    if (  validator.isEmpty(parameters.title) || validator.isEmpty(parameters.content) || !validator.isLength(parameters.title, { min: 0, max: 40 }) ) {
        throw new Error("El titulo y el contenido es obligatorio")
    }
}

module.exports = {
    validatorArticle
}