import { configLoader } from "./config.loader";
import { envSchema } from "./env.schema";

// El configOptions importamos el loadaer y el schema de validacion, este nos va a servir para cuando lo importemos en el app.modules para utilizar las variables de entorno

export const configOptions = {
    load: [configLoader],
    validationSchema: envSchema
}