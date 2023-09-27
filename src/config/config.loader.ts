// En el config loader vamos a guardar todas nuestras variables de entorno para asi tenerlas ordenadas para cuando se necesiten usar

export const configLoader = () => {
  return {
    mongo: {
        uri: process.env.MONGO_URI
    }
  }
}