import * as Joi from 'joi'

// Al crEar en envSchema lo que hago es darle una capa de seguridad a las variables de entorno con el proposito de que cada variable que se precise tienen que ser requeridas y de que tipo de dato debe ser, en esta caso el MONGO_URI debe ser tipo String.

export const envSchema = Joi.object({
    MONGO_URI : Joi.string().required()
})